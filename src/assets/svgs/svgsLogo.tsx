import type { TypeObjectGeneral } from "../../consts/types";

export const SVGMancha = ({
  id = "",
  from = "orange",
  to = "green",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 550 90"
      width={550}
      height={90}
      shapeRendering="geometricprecision"
      preserveAspectRatio="none"
      {...props}
    >
      <defs>
        <linearGradient
          id={`gradient-SVGMancha-1${id}`}
          x1="378.5"
          x2="378.5"
          y1="91.5"
          y2="93.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-2${id}`}
          x1="403"
          x2="403"
          y1="90.494"
          y2="92.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-3${id}`}
          x1="285.5"
          x2="285.5"
          y1="89.439"
          y2="92.562"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-4${id}`}
          x1="414.127"
          x2="414.127"
          y1="84.668"
          y2="88.442"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-5${id}`}
          x1="389"
          x2="389"
          y1="85.616"
          y2="88.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-6${id}`}
          x1="515.5"
          x2="515.5"
          y1="79.5"
          y2="82.407"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-7${id}`}
          x1="541"
          x2="541"
          y1="78.434"
          y2="81.51"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-8${id}`}
          x1="542"
          x2="542"
          y1="61.5"
          y2="63.325"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-9${id}`}
          x1="554"
          x2="554"
          y1="49.472"
          y2="51.565"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-10${id}`}
          x1="339.5"
          x2="339.5"
          y1="20.5"
          y2="22.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-11${id}`}
          x1="259"
          x2="259"
          y1="16.443"
          y2="19.609"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-12${id}`}
          x1="149.5"
          x2="149.5"
          y1="14.5"
          y2="17.431"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-13${id}`}
          x1="244.5"
          x2="244.5"
          y1="14.5"
          y2="18.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-14${id}`}
          x1="44"
          x2="44"
          y1="15.5"
          y2="16.561"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-15${id}`}
          x1="376.877"
          x2="376.877"
          y1="13.5"
          y2="17.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-16${id}`}
          x1="434.5"
          x2="434.5"
          y1="12.5"
          y2="15.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-17${id}`}
          x1="179.5"
          x2="179.5"
          y1="11.48"
          y2="25.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-18${id}`}
          x1="231"
          x2="231"
          y1="12.5"
          y2="14.562"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-19${id}`}
          x1="149.818"
          x2="149.818"
          y1="12.731"
          y2="14.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-20${id}`}
          x1="480.031"
          x2="480.031"
          y1="10.5"
          y2="13.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-21${id}`}
          x1="293"
          x2="293"
          y1="9.38"
          y2="96.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-22${id}`}
          x1="511"
          x2="511"
          y1="8.377"
          y2="10.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-23${id}`}
          x1="480.5"
          x2="480.5"
          y1="7.5"
          y2="10.592"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
        <linearGradient
          id={`gradient-SVGMancha-24${id}`}
          x1="412"
          x2="412"
          y1="7.49"
          y2="9.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={from}></stop>
          <stop offset="1" stopColor={to}></stop>
        </linearGradient>
      </defs>

      <path
        fill={`url(#gradient-SVGMancha-24${id})`}
        d="M403.5 8.5c5.485-1.152 11.151-1.318 17-.5A113.54 113.54 0 00406 9.5c-.671-.752-1.504-1.086-2.5-1z"
        opacity="0.843"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-23${id})`}
        d="M490.5 8.5v2h-10c-3.478.316-6.812-.184-10-1.5a4.452 4.452 0 012-1.5 86.735 86.735 0 0018 1z"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-22${id})`}
        d="M490.5 8.5c13.844-.329 27.51.004 41 1-6.854-.324-13.521.01-20 1h-21v-2z"
        opacity="0.927"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-21${id})`}
        d="M511.5 10.5c6.479-.99 13.146-1.324 20-1a2.427 2.427 0 012 .5 14.984 14.984 0 00-3 3.5 147.843 147.843 0 019 3.5 20.625 20.625 0 01-6 2c8.01.927 16.01 1.927 24 3l5 3c-6.317 1.8-5.984 3.467 1 5l-4 3a14.585 14.585 0 016 4 52.472 52.472 0 01-16 11 10.122 10.122 0 004 1.5l-1 2a56.296 56.296 0 00-13 2.5c2.405 2.032 1.905 3.532-1.5 4.5-.47 1.077-.303 2.077.5 3 2.155 2.034 4.488 2.367 7 1 4.247-1.102 8.58-1.268 13-.5.457.414.791.914 1 1.5a26.864 26.864 0 01-6 3.5 18.95 18.95 0 015 3 31.944 31.944 0 01-12 4c9.949 2 9.283 3.5-2 4.5-2.779-.221-5.446.112-8 1a111.864 111.864 0 00-26 0c-1.21.432-2.21 1.099-3 2-5.468.775-10.968.441-16.5-1a4249.714 4249.714 0 01-71.5 5c-2.668-1.11-5.501-1.11-8.5 0-2.359-.176-2.859.49-1.5 2a14.068 14.068 0 01-3.5-1c-2.886 1.725-6.052 2.392-9.5 2-4.974-3.845-9.974-3.845-15 0-29.67.079-59.337.412-89 1a40.939 40.939 0 00-9 .5c-2.153.1-3.819.933-5 2.5a1658.37 1658.37 0 01-66-1 972.173 972.173 0 00-22 2 9.208 9.208 0 01-4.5-2 144.339 144.339 0 00-13.5 5c-1.196-.346-1.196-.846 0-1.5-3.603-1.712-7.27-1.88-11-.5-2.455-.394-4.455-1.56-6-3.5l-6-1a67.363 67.363 0 0113-1.5c.543-.06.876-.393 1-1a9.864 9.864 0 00-6-1 437.728 437.728 0 00-25.5 2c-2.352.195-4.352-.472-6-2l-1 1a4.458 4.458 0 00-1.5-2c-1.823 1.247-3.823 1.914-6 2v1a714.894 714.894 0 01-5 3.5 104.388 104.388 0 00-20 3 42.498 42.498 0 01-13 0 20.473 20.473 0 00-3.5-2.5 62.787 62.787 0 01-15.5 1 23.313 23.313 0 00-6-3 789.074 789.074 0 0134-1.5c1.333-.667 1.333-1.333 0-2-8.84-1.735-17.673-1.568-26.5.5A350.088 350.088 0 0136.5 85l-3-2.5 1.5-1A256.464 256.464 0 0051.5 79a454.291 454.291 0 00-26-2c-3.166-.934-4.166-2.767-3-5.5 1.333-1.333 1.333-2.667 0-4-1.057-.706-.724-1.04 1-1 .934-1.068 1.268-2.401 1-4h-3c-.597-.235-.93-.735-1-1.5 1.86-7.116 6.194-11.783 13-14a42.336 42.336 0 01-8.5-1.5c.379-7.211 4.212-10.878 11.5-11-1.493-5.552.507-8.552 6-9 6.342-2.175 13.009-3.175 20-3-.11.617-.444 1.117-1 1.5a93.724 93.724 0 0011 1.5c16.802-1.5 33.635-2.833 50.5-4 2.379-.017 4.546.65 6.5 2a2704.823 2704.823 0 01120-5c-.457-.797-1.124-1.13-2-1 0-.667.333-1 1-1 25.439-1.976 51.106-2.643 77-2 9.413-.458 15.413-.124 18 1a1625.116 1625.116 0 01-79 1 27.876 27.876 0 00-11 1.5c2.094 1.352 4.427 1.852 7 1.5 25.683-.266 51.35.067 77 1 1.333 2.667 2.667 2.667 4 0 23.336-.167 46.669 0 70 .5-3.138 1.244-6.472 1.911-10 2 3.939 2.555 7.939 2.888 12 1v-3a348.909 348.909 0 0145 .5 258.699 258.699 0 0120-1.5 1273.81 1273.81 0 00-63-2.5c3.858-.794 7.858-1.46 12-2a57.946 57.946 0 0114-2c13.186.212 26.186.212 39 0a80.364 80.364 0 0124 0 61.254 61.254 0 0013-1 8.435 8.435 0 004-.5c-3.188-1.316-6.522-1.816-10-1.5zm-168 5a355.334 355.334 0 0027.5 2 352.096 352.096 0 0144.5 0 1273.81 1273.81 0 0163 2.5c-6.696.242-13.362.742-20 1.5a348.909 348.909 0 00-45-.5v3c-4.061 1.888-8.061 1.555-12-1 3.528-.089 6.862-.756 10-2-23.331-.5-46.664-.667-70-.5h-4a1647.684 1647.684 0 00-77-1 9.818 9.818 0 014-3c26.365.307 52.699-.027 79-1zm156 2c1.422.209 2.755.709 4 1.5-1.963.844-3.296.344-4-1.5zm-91 9l6 1.5-3 .5c-1.53-.14-2.53-.806-3-2zm26 3c3.14-1.14 6.473-1.308 10-.5-2.724.27-5.391.77-8 1.5a44.043 44.043 0 00-2-1zm-26 4c-3.125.98-6.458 1.313-10 1-1.929.27-3.595-.23-5-1.5l2-.5a52.37 52.37 0 0013 1zm-143 49a31.29 31.29 0 0110 1.5c-3.719 1.753-7.386 1.753-11 0 .556-.383.889-.883 1-1.5zm-14 1c1.679.392 3.346.892 5 1.5-2 .667-4 .667-6 0 .556-.383.889-.883 1-1.5zm-134 4c-5.344.166-10.677 0-16-.5a155.567 155.567 0 0110-1.5c2.383-.139 4.383.528 6 2zm49-2a91.699 91.699 0 0115 1.5c-4.576 1.476-9.243 1.81-14 1-.752-.67-1.086-1.504-1-2.5zm31 0c4.48-.232 8.813.435 13 2-1.059 1.196-2.393 1.863-4 2a33.39 33.39 0 00-9-2v-2z"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-20${id})`}
        d="M480.5 10.5h3a10.162 10.162 0 00-3 3c-5.251-1.02-5.251-2.02 0-3z"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-19${id})`}
        d="M148.5 14.5c-.111-.617-.444-1.117-1-1.5 5.829-.639 6.162-.139 1 1.5z"
        opacity="0.145"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-18${id})`}
        d="M224.5 12.5h17c-1.452.802-3.118 1.302-5 1.5-5.323.5-10.656.666-16 .5l4-2z"
        opacity="0.873"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-17${id})`}
        d="M325.5 13.5v1c-25.894-.643-51.561.024-77 2-.291-1.15-1.124-1.816-2.5-2-2.111.2-3.945.867-5.5 2a773.406 773.406 0 01-82.5 1c-4.438 1.768-8.938 2.101-13.5 1a10674.784 10674.784 0 00-82 4c-6.991-.175-13.658.825-20 3-1.324-2.166-3.157-2.5-5.5-1-1.662.113-2.83-.554-3.5-2a967.516 967.516 0 0139-4.5 1168.128 1168.128 0 0174-1.5c2.111 1.242 4.111 1.242 6 0 8.488-.651 16.988-1.318 25.5-2 10.097.152 20.263.152 30.5 0h12c5.344.166 10.677 0 16-.5 1.882-.198 3.548-.698 5-1.5 23.159.31 46.493-.023 70-1 4.924-.146 9.591.52 14 2z"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-16${id})`}
        d="M427.5 13.5c4.667-1.333 9.333-1.333 14 0a57.946 57.946 0 00-14 2c1.006-.896 1.006-1.562 0-2z"
        opacity="0.486"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-15${id})`}
        d="M427.5 13.5c1.006.438 1.006 1.104 0 2-4.142.54-8.142 1.206-12 2a352.096 352.096 0 00-44.5 0 355.334 355.334 0 01-27.5-2c-2.587-1.124-8.587-1.458-18-1v-1c33.795.606 67.795.606 102 0z"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-14${id})`}
        d="M39.5 16.5c2.803-1.138 5.803-1.305 9-.5a40.936 40.936 0 01-9 .5z"
        opacity="0.98"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-13${id})`}
        d="M248.5 16.5c-.667 0-1 .333-1 1 .065.438-.101.772-.5 1a4.458 4.458 0 00-1.5-2c-1.628 1.035-3.295 1.035-5 0 1.555-1.133 3.389-1.8 5.5-2 1.376.184 2.209.85 2.5 2z"
        opacity="0.686"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-12${id})`}
        d="M148.5 14.5c1.014 1.174 2.347 1.84 4 2-1.889 1.242-3.889 1.242-6 0 .333-1 1-1.667 2-2z"
        opacity="0.996"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-11${id})`}
        d="M264.5 16.5a9.818 9.818 0 00-4 3c-2.573.352-4.906-.148-7-1.5a27.876 27.876 0 0111-1.5z"
        opacity="0.787"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-10${id})`}
        d="M337.5 20.5h4c-1.333 2.667-2.667 2.667-4 0z"
        opacity="0.667"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-9${id})`}
        d="M553.5 49.5c.876-.13 1.543.203 2 1-.825.886-1.825 1.219-3 1l1-2z"
        opacity="0.553"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-8${id})`}
        d="M538.5 61.5c2.361.174 4.694.507 7 1-2.512 1.367-4.845 1.034-7-1z"
        opacity="0.494"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-7${id})`}
        d="M544.5 78.5c.304.65.637 1.317 1 2-2.606 1.152-5.273 1.318-8 .5-.556-.383-.889-.883-1-1.5 2.554-.888 5.221-1.221 8-1z"
        opacity="0.485"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-6${id})`}
        d="M510.5 79.5a117.28 117.28 0 0013 2.5 50.945 50.945 0 01-16-.5c.79-.901 1.79-1.568 3-2z"
        opacity="0.511"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-5${id})`}
        d="M396.5 88.5h-15c5.026-3.845 10.026-3.845 15 0z"
        opacity="0.444"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-4${id})`}
        d="M419.5 85.5c-1.21.432-2.21 1.099-3 2-2.441 1.256-4.774 1.256-7 0-1.359-1.51-.859-2.176 1.5-2 2.999-1.11 5.832-1.11 8.5 0z"
        opacity="0.92"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-3${id})`}
        d="M292.5 89.5c-1.792.81-3.792 1.31-6 1.5l6 1c-4.655.5-9.321.666-14 .5 1.181-1.567 2.847-2.4 5-2.5a40.939 40.939 0 019-.5z"
        opacity="0.515"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-2${id})`}
        d="M396.5 92.5v-1c4.146-1.147 8.48-1.314 13-.5-4.363.37-8.696.87-13 1.5z"
        opacity="0.295"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
      <path
        fill={`url(#gradient-SVGMancha-1${id})`}
        d="M360.5 91.5h36v1c-7.99.523-15.99.856-24 1l-12-2z"
        transform="translate(97.307 -35.82) translate(-116.136 29.267)"
      ></path>
    </svg>
  );
};

export const SVGTextoImanes = ({
  id = "",
  from = "orange",
  to = "blue",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={285}
    height={100}
    viewBox={`0 0 285 100`}
    {...props}
  >
    <defs>
      <linearGradient
        id={`gradient-SVGTextoImanes${id}`}
        x1="220"
        x2="220"
        y1="100"
        y2="200"
        gradientTransform="translate(-27 -100)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor={from}></stop>
        <stop offset="1" stopColor={to}></stop>
      </linearGradient>
    </defs>
    <text
      y="100"
      x="1"
      fill={`url(#gradient-SVGTextoImanes${id})`}
      fontSize="100"
      fontWeight="700"
    >
      IMANES
    </text>
  </svg>
);

export const SVGTextoTucuman = (props: TypeObjectGeneral) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={420}
    height={110}
    viewBox={`0 0 420 110`}
    {...props}
  >
    <defs>
      <linearGradient
        id={`gradient-SVGTextoTucuman-${props?.id}`}
        x1="0%"
        y1="0%"
        x2="60%"
        y2="100%"
        gradientTransform="rotate(45)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#727472" />
        <stop offset="50%" stopColor="rgb(171, 174, 171)" />
        <stop offset="100%" stopColor="#727472" />
      </linearGradient>

      <filter
        id={`drop-shadow-SVGTextoTucuman-${props?.id}`}
        width="200%"
        height="200%"
        x="-50%"
        y="-50%"
      >
        <feMerge>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>

      <filter
        id={`outline-filter-SVGTextoTucuman-${props?.id}`}
        width="200%"
        height="200%"
        x="-50%"
        y="-50%"
        colorInterpolationFilters="sRGB"
      >
        <feMorphology
          in="SourceAlpha"
          operator="dilate"
          radius="4"
          result="dilated"
        ></feMorphology>
        <feComposite
          in="flood"
          in2="dilated"
          operator="in"
          result="outline"
        ></feComposite>
        <feMerge>
          <feMergeNode in="outline"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>

    <text
      y="104"
      x="8"
      fill={`url(#gradient-SVGTextoTucuman-${props?.id})`}
      fontSize="100"
      fontWeight="700"
      filter={`url(#outline-filter-SVGTextoTucuman-${props?.id}) url(#drop-shadow-SVGTextoTucuman-${props?.id})`}
      style={{
        textShadow: `0 1px 1px black`,
      }}
    >
      TUCUMÀN
    </text>
  </svg>
);
