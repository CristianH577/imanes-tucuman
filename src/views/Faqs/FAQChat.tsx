import { FAQ_DATA, FAQ_EMBEDDINGS } from "../../consts/faqs";
import { useEffect, useState } from "react";

import { env } from "@huggingface/transformers";
import { scrollStyle } from "../../libs/tvs";
import { Button, Divider, IconButton } from "@mui/material";
import InputSearch from "../../components/InputSearch";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import type { TypeChatItem, TypeOutletContext } from "../../consts/types";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LinkCustom from "../../components/LinkCustom";
import { useOutletContext } from "react-router";

env.allowLocalModels = false;
env.useBrowserCache = false;

function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0);

  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));

  return dot / (magA * magB);
}

export default function FAQChat() {
  const context: TypeOutletContext = useOutletContext();
  const extractorRef = context.extractorRef;

  const [input, setInput] = useState("");
  const [chat, setChat] = useState<TypeChatItem[]>([]);
  const [loading, setLoading] = useState(false);

  const cleanChat = () => setChat([]);

  const initAI = async () => {
    setLoading(true);
    // const task = "feature-extraction";
    // const model = "Xenova/all-MiniLM-L6-v2";

    // const pipe = await pipeline(task, model);
    // extractorRef.current = pipe;

    setLoading(false);
  };

  const sendQuestion = async () => {
    if (input) {
      setLoading(true);

      const response = await ask(input);

      let newItem = { i: input, q: "Error", a: "Sin respuesta" };
      if (response) {
        newItem = { i: input, ...response };
      }

      setChat([newItem, ...chat]);
      setInput("");

      setLoading(false);
    }
  };

  const handleRelatedQuestion = async (q: string) => {
    setLoading(true);

    const response = await ask(q);

    let newItem = { q: "Error", a: "Sin respuesta" };
    if (response) {
      newItem = { ...response };
    }

    setChat([newItem, ...chat]);
    setInput("");

    setLoading(false);
  };

  const ask = async (question: string) => {
    if (!extractorRef.current) return null;

    const output = await extractorRef.current(question, {
      pooling: "mean",
      normalize: true,
    });

    const embedding = Array.from(output.data);

    let best = null;
    let bestScore = -1;

    for (const item of FAQ_EMBEDDINGS) {
      if (question === item.q) {
        return item;
      }
      if (item.aliases?.includes(question)) {
        return item;
      }
      // @ts-ignore
      let score = cosineSimilarity(embedding, item.embedding);

      // BOOST MANUAL
      if (
        item.keywords?.some((k: string) =>
          question.toLowerCase().includes(k.toLowerCase())
        )
      ) {
        score += 0.2;
      }

      // PRIORIDAD
      if (item.priority) {
        score += item.priority * 0.01;
      }

      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    }

    return best;
  };

  const prepareFAQ = async () => {
    if (!extractorRef.current) return null;

    const faqEmbeddings = [];

    for (const item of FAQ_DATA) {
      const text = [
        item.q,
        item.shortAnswer,
        item.a,
        item.category,

        ...(item.tags || []),
        ...(item.keywords || []),
        ...(item.links || []).map((link) => [link.label, link.url].join(" ")),
      ]
        .filter(Boolean)
        .join("\n");

      const output = await extractorRef.current(text, {
        pooling: "mean",
        normalize: true,
      });

      faqEmbeddings.push({
        ...item,
        embedding: Array.from(output.data),
      });
    }
    console.log(faqEmbeddings);
  };

  useEffect(() => {
    async function load() {
      if (!extractorRef.current) await initAI();
    }

    load();
  }, []);

  return (
    <>
      <InputSearch
        value={input}
        setValue={setInput}
        handleSearch={() => sendQuestion()}
        className="w-full"
        loading={loading}
        placeholder={loading ? "Cargando..." : "Consultar..."}
        iconButton={<QuestionMarkIcon />}
      />

      <ol
        className={
          "h-80 overflow-auto rounded-md p-2 sm:px-4 bg-content1 shadow-md border-2 border-content4 space-y-2  " +
          scrollStyle
        }
      >
        <li className="font-bold text-center text-customSwitch text-tert grid grid-cols-3 items-center gap-2 border-b-2 border-content4 pb-2 mb-2">
          <IconButton
            size="small"
            className="place-self-start"
            onClick={cleanChat}
          >
            <DeleteForeverIcon />
          </IconButton>

          <h2>CHAT</h2>

          <div></div>
        </li>

        {/* {loading && (
          <li className="h-24 flex justify-center items-center">
            <CircularProgress />
          </li>
        )} */}

        {chat.map((e, i) => (
          <li key={i} className="space-y-2 font-sans">
            {e.i && (
              <p className="font-bold text-right text-customSwitch">"{e.i}"</p>
            )}
            <p className="font-bold">¿{e.q}?</p>
            {e.a.split("\n").map((t, j) => (
              <p key={j} className="indent-2">
                {t}
              </p>
            ))}
            {e.links && (
              <ol className="list-none font-bold flex flex-wrap gap-4">
                {e.links.map((link, j) => (
                  <li key={j} className="ps-6">
                    <LinkCustom
                      href={link.url}
                      title={"Ir a " + link.label}
                      isExternal
                    >
                      {link.label}
                    </LinkCustom>
                  </li>
                ))}
              </ol>
            )}
            {e.relatedIds && (
              <ol className="list-none text-second">
                {e.relatedIds.map((id) => {
                  const item = FAQ_EMBEDDINGS.filter((f) => f.id === id)[0];
                  return (
                    <li key={id} className="">
                      <span
                        title="Consultar"
                        className="hover:underline cursor-pointer"
                        onClick={() => handleRelatedQuestion(item.q)}
                      >
                        ➤ ¿{item.q}?
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}

            <Divider />
          </li>
        ))}
      </ol>

      <Button variant="contained" onClick={prepareFAQ}>
        Actualizar FAQ
      </Button>
    </>
  );
}
