export default function BasesYCond() {
  const list = [
    {
      title: "Condiciones de los articulos",
      content: `Los productos pueden traer algún pequeño defecto de forma de fabrica, recuerde revisar o avisar si esto es un problema.
        Las fuerzas y medidas mostradas son aproximadas y pueden variar ligeramente.`,
    },
    {
      title: "Garantia",
      content: `Los productos tienen 3 días de garantía para cambios siempre y cuando no hayan sido usados y estén en condiciones.
      Para los imanes flexibles que deben ser cortados, en caso de una devolucion o cambio tendra un reintegro del 90-95% del pago.`,
      array: ["Cuales son las condiciones de envío por Uber?"],
    },
    {
      title: "Envios",
      content: `Si se realiza el envio a traves del servicio de Uber se efectua el pago de la compra antes por transferencia, el envío lo puede pagar en efectivo cuando lo entreguen o transferirlo con el pago.
        Se usara la información a disposición (nombre, numero de teléfono, etc.) para utilizar el PIN de seguridad dentro de la app.`,
    },
    {
      title: "Pedidos grandes",
      content:
        "Los pedidos grandes deben pagarse con antelacion y pueden llevar un costo adicional del transporte. Tienen un tiempo de demora de entre 2 y 4 semanas.",
    },
  ];
  return (
    <ul>
      {list.map((li, i) => (
        <li key={i}>
          <b>{li.title}</b>
          <p>{li.content}</p>
        </li>
      ))}
    </ul>
  );
}
