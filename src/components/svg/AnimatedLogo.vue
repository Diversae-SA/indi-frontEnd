<script setup lang="ts">
const props = defineProps<{
  light?: boolean
}>()

const router = useRouter()
const isLoading = ref(false)

router.beforeEach(() => {
  isLoading.value = true
})
router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 200)
})
</script>

<template>
  <svg
    id="svg1"
    width="271.73792"
    height="50.14624"
    viewBox="0 0 271.73792 50.14624"
    xml:space="preserve"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    :class="[props.light && 'is-light']"
  >
    <defs id="defs1">
      <color-profile
        id="color-profile1"
        name="sRGB-IEC61966-2.1"
        xlink:href="data:application/vnd.iccprofile;base64,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"
      />
      <clipPath
        id="clipPath388-4"
        clipPathUnits="userSpaceOnUse"
      >
        <path
          id="path388-9"
          d="M 0,1080 H 1920 V 0 H 0 Z"
          transform="translate(-1054.8154,-892.73292)"
        />
      </clipPath>
      <clipPath
        id="clipPath390-5"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path390-0"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1077.8565,-899.71042)"
      /></clipPath><clipPath
        id="clipPath392-4"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path392-8"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1077.2148,-905.63922)"
      /></clipPath><clipPath
        id="clipPath394-7"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path394-1"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1075.7646,-914.31692)"
      /></clipPath><clipPath
        id="clipPath396-7"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path396-2"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1080.2472,-914.59332)"
      /></clipPath><clipPath
        id="clipPath398-7"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path398-2"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1079.0118,-914.57762)"
      /></clipPath><clipPath
        id="clipPath400-2"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path400-6"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1086.2637,-926.97462)"
      /></clipPath><clipPath
        id="clipPath402-1"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path402-0"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1078.2354,-926.42142)"
      /></clipPath><clipPath
        id="clipPath404-6"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path404-1"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1082.8555,-926.87742)"
      /></clipPath><clipPath
        id="clipPath406-5"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path406-9"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1081.0743,-930.28763)"
      /></clipPath><clipPath
        id="clipPath408-4"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path408-9"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1081.0743,-930.28763)"
      /></clipPath><clipPath
        id="clipPath410-0"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path410-9"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1079.3595,-938.16992)"
      /></clipPath><clipPath
        id="clipPath412-1"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path412-7"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1078.5216,-927.22122)"
      /></clipPath><clipPath
        id="clipPath414-7"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path414-1"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1073.4648,-935.27102)"
      /></clipPath><clipPath
        id="clipPath416-1"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path416-5"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1077.0489,-934.42632)"
      /></clipPath><clipPath
        id="clipPath418-9"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path418-7"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1077.2109,-934.17432)"
      /></clipPath><clipPath
        id="clipPath420-7"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path420-6"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1072.9063,-938.41553)"
      /></clipPath><clipPath
        id="clipPath422-7"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path422-3"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1062.4941,-940.23143)"
      /></clipPath><clipPath
        id="clipPath424-6"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path424-5"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1073.9103,-940.01462)"
      /></clipPath><clipPath
        id="clipPath426-6"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path426-3"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1068.6982,-944.66603)"
      /></clipPath><clipPath
        id="clipPath428-9"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path428-4"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1065.7852,-941.22752)"
      /></clipPath><clipPath
        id="clipPath430-8"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path430-1"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1071.3633,-937.60112)"
      /></clipPath><clipPath
        id="clipPath432-2"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path432-9"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1072.9834,-939.58842)"
      /></clipPath><clipPath
        id="clipPath434-3"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path434-9"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1083.0489,-925.46582)"
      /></clipPath><clipPath
        id="clipPath436-0"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path436-8"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1082.626,-912.83543)"
      /></clipPath><clipPath
        id="clipPath438-8"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path438-5"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1076.4015,-900.49272)"
      /></clipPath><clipPath
        id="clipPath440-0"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path440-9"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1078.4697,-913.87992)"
      /></clipPath><clipPath
        id="clipPath442-6"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path442-3"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1075.4142,-904.65383)"
      /></clipPath><clipPath
        id="clipPath444-8"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path444-5"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1075.1163,-941.04053)"
      /></clipPath><clipPath
        id="clipPath446-6"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path446-1"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1070.082,-894.54492)"
      /></clipPath><clipPath
        id="clipPath448-1"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path448-5"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1070.043,-901.24712)"
      /></clipPath><clipPath
        id="clipPath450-9"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path450-8"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1050.2148,-892.80322)"
      /></clipPath><clipPath
        id="clipPath452-4"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path452-8"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1057.876,-893.51612)"
      /></clipPath><clipPath
        id="clipPath454-1"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path454-0"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1043.0439,-889.67482)"
      /></clipPath><clipPath
        id="clipPath456-3"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path456-0"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1064.8389,-889.78372)"
      /></clipPath><clipPath
        id="clipPath458-4"
        clipPathUnits="userSpaceOnUse"
      ><path
        id="path458-4"
        d="M 0,1080 H 1920 V 0 H 0 Z"
        transform="translate(-1053.3096,-932.90432)"
      /></clipPath></defs>
    <g
      id="layer-MC0"
      transform="translate(-133.47681,-575.1554)"
    ><g
      id="g1487"
      transform="matrix(0.26015901,0,0,0.26015901,104.75631,409.92045)"
      style="stroke-width:3.84379"
    ><path
      id="path387-4"
      d="m 0,0 c -2.059,-1.133 -0.982,-0.715 -5.628,1.117 0,0 -2.367,1.071 -3.394,1.25 -1.028,0.179 -1.698,0.313 -5.003,0.313 0,0 -4.984,0.332 -7.814,1.879 -1.302,0.711 -2.204,1.349 -3.849,2.862 -0.502,0.462 -2.22,1.823 -1.827,2.183 0.313,0.285 1.695,-0.604 2.814,-1.13 1.098,-0.517 2.264,-1.007 3.103,-1.242 2.468,-0.691 5.761,-1.609 5.849,-1.258 0.099,0.395 -3.759,1.238 -5.799,2.061 -1.371,0.553 -3.957,1.702 -6.726,4.784 -2.77,3.082 -3.127,8.085 -3.127,8.085 0,0 0.223,0.447 0.492,0 0.267,-0.446 1.58,-3.983 5.137,-6.7 0,0 1.736,-1.136 4.107,-2.652 0,0 1.027,-0.135 -0.804,1.206 -1.832,1.34 -2.186,1.278 -5.655,5.267 -0.407,0.468 -1.937,2.854 -3.048,5.232 -1.492,3.192 -3.913,3.508 -3.266,3.945 0.734,0.496 3.796,-1.429 5.762,-3.573 1.965,-2.144 3.433,-5.272 3.433,-5.272 0,0 0.848,-0.446 -0.09,1.206 -0.938,1.653 -1.378,3.083 -4.014,5.674 0,0 -1.514,1.044 -2.944,6.092 0,0 -0.225,2.209 -1.047,3.882 -0.784,1.597 -1.326,1.522 -1.189,1.773 0.293,0.54 2.412,0 5.136,-6.521 0,0 1.709,-4.562 2.189,-4.422 0.343,0.1 -0.015,0.602 -0.497,1.663 -0.583,1.283 -1.048,2.676 -1.19,3.08 -0.923,2.625 -2.007,3.803 -0.773,8.36 0.324,1.199 1.144,2.478 0.546,5.822 -0.071,0.39 -0.746,1.599 -0.543,1.8 0.415,0.411 1.623,-0.825 1.936,-3.593 0.247,-2.174 0.187,-6.393 0.304,-9.239 0.041,-1.016 0.24,-2.732 0.498,-2.64 0.326,0.118 0.093,1.114 0.071,2.255 -0.02,1.031 -0.259,9.527 0.585,12.235 0.643,2.055 1.832,3.409 3.279,4.925 0.393,0.413 1.215,1.543 1.393,2.079 0.179,0.536 0.779,0.366 0.734,0.008 -0.045,-0.357 0.113,-1.247 -1.795,-4.56 -0.734,-1.274 -0.969,-3.764 -1.798,-6.367 -0.474,-1.491 -0.97,-3.219 -0.639,-3.195 0.365,0.026 2.157,6.353 2.407,7.289 1.45,5.435 6.044,9.343 7.408,8.709 0.252,-0.116 -0.153,-0.524 -0.715,-0.848 0,0 -1.882,-1.301 -2.328,-3.534 -0.448,-2.234 -1.712,-4.608 -2.809,-6.293 0,0 -0.134,-0.492 0.179,-0.357 0.313,0.133 2.958,4.421 4.566,5.716 1.608,1.295 4.945,2.355 6.3,3.617 0.988,0.92 1.641,0.672 1.016,-0.221 -0.625,-0.894 -6.701,-7.504 -10.05,-8.934 0,0 -2.853,-1.561 -4.223,-4.302 -0.132,-0.264 -0.449,-0.824 -0.379,-0.879 0.248,-0.191 0.224,-0.179 0.849,0.893 0.626,1.072 2.457,3.35 4.244,3.886 0,0 2.358,0.579 3.386,1.204 1.027,0.625 1.536,1.253 1.931,1.865 0.418,0.647 1.037,0.863 0.867,-0.03 -0.066,-0.345 -0.444,-1.95 -2.565,-3.795 -1.129,-0.983 -2.216,-0.887 -5.435,-2.987 -0.817,-0.532 -2.304,-1.906 -2.894,-2.613 -1.22,-1.46 -2.301,-3.991 -1.912,-4.287 0.307,-0.233 0.559,0.998 1.445,2.491 0.92,1.549 2.526,3.495 5.49,4.802 l 2.099,1.206 c 0,0 0.536,0.134 0.268,-0.402 -0.268,-0.536 -4.566,-5.065 -5.593,-6.003 -1.027,-0.938 -3.972,-4.125 -3.772,-8.709 0.062,-1.402 0.435,-3.415 0.788,-3.334 0.3,0.068 0.043,0.257 -0.047,0.968 -0.299,2.349 -0.05,3.883 0.921,6.047 1.318,2.936 2.62,4.219 2.8,3.382 0.076,-0.352 -0.829,-0.338 -0.786,-3.262 0.029,-1.906 -0.202,-2.728 -0.719,-5.245 -0.306,-1.491 -0.768,-3.091 -0.451,-5.377 0.227,-1.637 1.319,-5.378 1.84,-5.07 0.278,0.163 -0.502,1.465 -0.679,2.241 -0.36,1.585 0.011,2.948 0.131,5.149 0.119,2.155 -0.329,2.642 -0.329,2.642 0,0 0.027,0.664 0.696,0.173 0.67,-0.492 1.85,-2.183 2.208,-6.471 0,0 0.258,-4.689 2.298,-8.013 1.541,-2.51 4.64,-4.422 4.82,-4.122 0.238,0.397 -2.304,1.215 -3.956,4.2 -0.414,0.748 -0.874,2.401 -1.188,3.194 -0.524,1.329 0.188,1.716 0.386,1.224 0.874,-2.169 2.136,-2.223 3.789,-4.233 1.652,-2.01 3.671,-4.931 5.1,-5.824 1.429,-0.894 5.456,-3.042 5.456,-3.042 0,0 1.339,-0.626 1.697,-0.849 C -0.179,0.312 0.166,0.091 0,0"
      style="fill:#e1261c;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,183.30549,790.87616)"
      clip-path="url(#clipPath388-4)"
    /><path
      id="path389-7"
      d="m 0,0 c -1.442,-0.66 -2.266,-0.699 -2.429,-0.694 -0.163,0.005 -1.526,-0.307 -2.969,-0.263 -1.444,0.044 -1.998,-0.433 -2.376,-0.816 -0.434,-0.436 -1.59,-1.436 -1.59,-1.436 l 0.693,-0.101 c 1.253,0.903 2.675,1.128 3.139,1.14 0.463,0.013 1.601,0.07 2.665,0.294 1.524,0.32 1.537,0.442 1.287,0.124 -0.106,-0.135 -0.936,-0.754 -2.211,-0.873 -1.086,-0.1 -2.026,-0.19 -2.457,-0.257 -0.692,-0.109 -1.927,-0.634 -1.927,-0.634 0,0 1.274,-0.383 1.676,-0.429 3.275,-0.379 5.164,1.325 5.164,1.325 0,0 0.227,0.307 0.706,0.788 C 0.271,-0.927 0.729,0.333 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,231.93078,776.151)"
      clip-path="url(#clipPath390-5)"
    /><path
      id="path391-6"
      d="M 0,0 C 0.875,0.63 1.771,1.719 2.051,2.063 2.329,2.41 3.376,4.229 4.738,4.603 4.884,4.643 6.575,5.009 4.929,4.168 3.586,3.482 2.541,1.709 1.643,0.57 1.086,-0.136 0.145,-0.65 0.145,-0.65 c 0,0 -0.58,-0.246 -0.661,-0.11 C -0.613,-0.597 -0.339,-0.244 0,0 M 7.483,2.532 C 6.811,2.332 6.578,2.162 6.578,2.162 5.082,1.761 4.801,0.577 4.133,-0.16 3.786,-0.544 3.162,-1.028 1.588,-1.667 0.172,-2.243 0.32,-2.2 0.293,-2.203 c 0,0 -0.38,-0.184 -0.632,-0.443 l 0.582,-0.019 c 0,0 1.224,-0.091 2.581,0.479 0.85,0.357 1.528,0.746 2.308,1.86 C 5.478,0.166 5.944,1.125 5.948,0.505 5.959,-1.113 3.31,-2.927 2.242,-3.047 1.896,-3.086 1.408,-3.188 0.367,-3.245 c -0.929,-0.05 -1.746,0.399 -1.746,0.399 0.103,0.235 0,0 0,0 0.036,0.265 1.673,1.21 2.552,1.577 1.036,0.434 2.022,1.062 2.532,1.621 0.508,0.56 0.704,0.889 1.097,1.478 0.403,0.604 0.687,1.385 1.065,1.821 1.284,1.482 1.022,4.86 0.397,4.575 C 5.993,8.102 6.497,7.041 5.551,6.134 4.986,5.593 4.29,5.557 3.61,5.47 2.192,5.286 0.089,1.832 -0.182,1.271 -0.375,0.871 -0.701,0.583 -0.968,0.635 -1.234,0.688 -0.35,3.615 -0.157,4.095 0.036,4.575 0.174,5.756 0.184,6.066 0.193,6.375 0.169,6.706 -0.357,6.839 -0.949,6.99 -1.198,7.667 -1.198,7.667 -2.146,6.048 -1.564,4.846 -1.466,3.692 -1.367,2.539 -1.835,0.429 -1.835,0.429 -0.552,-0.585 -1.35,-1.722 -1.806,-2.158 -2.809,-3.115 -4.21,-2.206 -4.244,-2.431 -4.54,-4.368 -6.062,-6.465 -6.062,-6.465 l 2.637,0.259 c 0,0 0.213,-0.144 -0.062,0.394 -0.468,0.914 -0.045,1.696 0.392,2.018 0.818,0.603 2.164,0.11 2.164,0.11 0,0 1.703,-1.06 3.565,-0.396 1.574,0.562 2.414,1.397 3.017,2.236 0.953,1.324 0.845,2.41 1.332,3.173 0.288,0.451 0.808,1.295 0.5,1.203"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,230.57671,763.63901)"
      clip-path="url(#clipPath392-4)"
    /><path
      id="path393-3"
      d="M 0,0 C 0,0 -0.391,0.302 -0.536,0.671 -1.4,2.872 -1.571,2.753 -1.727,2.433 -2.117,1.621 -2.356,0.818 -2.369,0.421 -2.382,0.022 -2.398,-0.814 -2.34,-1.785 c 0.019,-0.308 0.084,-1.553 -0.396,-2.645 -0.481,-1.091 -0.079,-1.99 0,-2.347 0.078,-0.357 0.522,-1.371 0.522,-1.371 0,0 0.51,0.116 0.638,0.143 0.143,0.031 0.741,-0.063 0.741,-0.063 0,0 0.268,1.14 0.298,1.675 0.022,0.384 -0.02,1.052 -0.172,2.093 -0.222,1.495 -0.162,1.926 0.019,2.766 C -0.426,-0.308 0,0 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,227.51624,745.32579)"
      clip-path="url(#clipPath394-7)"
    /><path
      id="path395-1"
      d="m 0,0 c -0.895,-0.018 -1.391,-1.596 -1.391,-1.596 0,0 -0.06,-0.238 -0.561,-0.532 -0.5,-0.294 -0.425,-0.803 -0.459,-1.598 -0.042,-0.97 -0.338,-1.458 -0.708,-2.435 -0.116,-0.309 -0.073,-0.334 -0.002,-0.351 0.262,-0.062 1.095,1.465 1.597,2.15 0.529,0.721 1.659,1.283 1.659,1.283 l 0.022,0.032 c -1.416,1.535 -0.162,2.551 0.191,2.77 C 0.697,-0.061 0.895,0.016 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,236.97606,744.74249)"
      clip-path="url(#clipPath396-7)"
    /><path
      id="path397-7"
      d="m 0,0 c 0.166,0.073 0.037,0.506 0.037,0.506 0,0 -0.013,0.558 -0.169,1.238 -0.157,0.678 -0.666,1.456 -1.005,2.025 -0.339,0.566 -0.851,1.281 -1.149,2.17 -0.299,0.889 0.043,2.55 0.079,2.754 0.036,0.204 -0.16,0.196 -0.331,0.406 C -2.71,9.31 -3.287,9.977 -3.539,9.804 -3.81,9.619 -3.48,9.488 -3.557,8.501 -3.575,8.269 -3.656,7.992 -3.698,7.583 -3.741,7.173 -4.018,5.374 -3.475,4.223 -2.844,2.887 -2.283,2.832 -1.553,2.307 -0.26,1.378 -0.276,-0.122 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,234.3689,744.77562)"
      clip-path="url(#clipPath398-7)"
    /><path
      id="path399-5"
      d="m 0,0 c -0.227,0.107 -0.711,-0.683 -0.863,-0.824 -0.153,-0.142 -0.844,-0.784 -2.334,-1.961 -1.167,-0.922 -1.589,-0.824 -2.723,-3.603 -1.183,-2.898 -0.796,-5.636 -0.796,-5.636 l 0.152,0.034 c 0,0 0.526,1.192 0.697,1.921 0.17,0.727 0.752,2.351 1.179,3.182 0.712,1.389 1.815,2.716 1.866,2.77 1.237,1.336 0.986,0.948 1.689,1.631 0.701,0.682 0.55,0.334 0.55,0.334 0,0 -0.658,-1.115 -2.102,-2.928 -1.002,-1.257 -0.884,-1.178 -1.454,-2.298 -0.437,-0.86 -1.094,-2.697 -1.094,-2.697 l -0.556,-1.723 1.747,1.065 c 0.944,0.82 1.32,1.432 2.185,2.548 0.863,1.117 1.596,2.424 1.768,3.211 C 0.084,-4.188 0.745,-0.353 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,249.6733,718.61328)"
      clip-path="url(#clipPath400-2)"
    /><path
      id="path401-9"
      d="m 0,0 c -0.571,0.567 -0.77,0.931 -1.023,0.742 -0.347,-0.257 0.097,-1.071 0.077,-1.718 -0.02,-0.647 0.012,-1.748 -0.039,-2.33 -0.05,-0.58 -0.374,-1.542 0.021,-2.493 0.397,-0.951 0.862,-1.439 1.18,-2.043 0.302,-0.574 0.698,-1.77 0.698,-1.77 0,0 0.004,2.234 0.201,3.361 0.198,1.126 0.318,2.871 0.083,3.752 C 0.964,-1.617 0.571,-0.569 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,232.73056,719.78074)"
      clip-path="url(#clipPath402-1)"
    /><path
      id="path403-6"
      d="m 0,0 c 0.89,-0.428 0.583,-1.736 0.583,-1.736 0,0 0.526,1.237 0.538,1.626 C 1.133,0.278 1.229,1.834 0.805,2.031 0.69,2.084 0.096,1.279 0.096,1.279 -0.406,0.907 -0.688,0.193 -0.688,0.193 -0.688,0.193 -0.437,0.21 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,242.48066,718.81841)"
      clip-path="url(#clipPath404-6)"
    /><path
      id="path405-2"
      d="M 0,0 C 0.156,-0.168 0.633,1.035 0.837,2.115 0.923,2.568 0.974,3.323 0.979,3.831 0.985,4.179 0.862,4.782 1.01,4.814 1.146,4.843 1.182,4.515 1.246,4.001 1.271,3.813 1.316,3.343 1.266,2.698 1.227,2.181 1.229,1.795 0.976,1.099 0.753,0.482 0.518,-0.061 0.372,-0.302 c -0.121,-0.199 -0.49,-0.957 -0.49,-0.957 0,0 -0.233,-0.59 -0.217,-1.141 0.016,-0.551 0.049,-1.29 0.049,-1.29 0,0 0.396,0.461 0.987,0.507 0,0 0.006,1.089 0.016,1.38 0.009,0.291 0.444,2.184 0.647,2.76 C 1.665,1.812 1.889,3.296 1.521,5.031 1.423,5.506 1.82,6.738 1.388,6.967 0.861,7.248 0.672,6.52 0.292,4.864 0.177,4.358 0.333,2.993 0.213,1.544 0.146,0.749 -0.077,0.083 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,238.72155,711.62159)"
      clip-path="url(#clipPath406-5)"
    /><path
      id="path409-7"
      d="m 0,0 c 0.018,-0.264 -0.058,-0.833 -0.062,-0.937 0,-0.052 -0.102,-0.704 0.435,-3.123 C 0.729,-5.661 0.595,-7.308 0.601,-7.554 0.61,-8.047 0.571,-8.152 0.58,-8.443 0.588,-8.725 0.327,-9.017 0.245,-8.247 0.198,-7.817 0.165,-5.503 -0.164,-4.163 -0.785,-1.641 -0.062,0.902 0,0 m -1.796,-3.797 c 0.061,-0.504 0.36,-0.862 0.894,-1.967 0.175,-0.365 0.386,-1.218 0.443,-1.511 0.056,-0.293 0.106,-0.646 0.104,-0.742 -0.003,-0.098 0.042,-0.778 0.042,-0.778 0,0 -1.562,0.673 -2.234,1.18 -0.672,0.506 -1.432,1.21 -1.921,1.631 -0.56,0.483 -1.858,2.105 -1.84,3.38 l -0.602,0.581 c 0,0 -0.558,-2.816 1.623,-4.71 0.633,-0.548 1.306,-1.141 2.789,-1.866 1.48,-0.725 1.75,-1.543 2.33,-2.888 0.58,-1.346 0.724,-1.997 0.776,-2.387 0.055,-0.391 0.125,-1.342 0.098,-1.872 -0.026,-0.507 -0.274,-2.236 -0.274,-2.236 0,0 0.568,2.589 2.127,3.66 0,0 -2.078,-0.08 -1.56,2.374 l -0.071,1.01 c 0,0 -0.033,1.023 0.242,2.176 0.2,0.84 0.392,2.02 0.453,3.622 C 1.66,-4.141 1.602,-3.657 1.515,-2.748 1.381,-1.326 0.868,0.723 0.809,0.969 0.634,1.689 0.572,1.799 0.37,2.369 0.299,2.57 0.195,3.23 -0.018,3.248 -0.147,3.258 -0.482,2.403 -0.482,2.403 c 0,0 -0.331,-0.875 -0.394,-1.113 -0.199,-0.752 -0.402,-1.248 -0.728,-3.086 -0.053,-0.305 -0.105,-1.134 -0.14,-1.23 -0.036,-0.097 -0.073,-0.579 -0.052,-0.771"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,235.10268,694.98698)"
      clip-path="url(#clipPath410-0)"
    /><path
      id="path411-8"
      d="M 0,0 C 0,0 -0.227,0.503 -0.443,0.773 -0.896,1.333 -1.039,1.644 -2.809,2.572 -4.578,3.5 -5.215,4.374 -6.187,5.722 -6.486,6.138 -7.4,6.501 -7.567,6.225 -7.718,5.979 -7,4.988 -6.729,4.452 -6.394,3.784 -6.268,3.364 -5.195,2.565 -4.054,1.716 -3.258,1.692 -2.506,1.437 -1.429,1.071 0,0 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,233.33439,718.09286)"
      clip-path="url(#clipPath412-1)"
    /><path
      id="path413-5"
      d="M 0,0 C 0.056,-0.149 0.435,-0.986 1.371,-2.23 2.797,-4.122 5.075,-5.016 5.075,-5.016 4.843,-3.858 4.649,-3.269 4.295,-2.66 3.064,-0.543 -0.004,0.062 -0.004,0.062 -0.004,0.062 -0.055,0.149 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,222.6628,701.10475)"
      clip-path="url(#clipPath414-7)"
    /><path
      id="path415-7"
      d="M 0,0 C 0.188,0.099 0.24,1.551 0.24,1.551 L 0.051,1.765 -0.95,3.095 c 0,0 -0.384,0.37 -0.764,1.125 -0.16,0.317 -0.293,0.484 -0.155,0.594 C -1.637,5 -1.36,4.494 -1.119,4.163 -0.754,3.658 0.26,2.2 0.26,2.2 L 0.555,3.799 -1.942,5.751 C -1.983,5.398 -2.584,5.269 -2.584,5.269 -3.069,3.013 -0.574,-0.302 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,230.22644,702.88739)"
      clip-path="url(#clipPath416-1)"
    /><path
      id="path417-4"
      d="M 0,0 C 0.021,-0.015 0.034,-0.023 0.034,-0.023 0.034,-0.023 0.017,-0.011 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,230.56848,703.4192)"
      clip-path="url(#clipPath418-9)"
    /><path
      id="path419-1"
      d="m 0,0 c -0.496,-0.397 -1.274,-0.346 -1.274,-0.346 l 0.389,-0.633 0.154,-0.259 c 0,0 0.846,-1.165 1.345,-1.341 0.214,-0.074 0.991,-0.236 1.762,-0.589 0.885,-0.405 -0.785,0.777 -1.214,3.162 L 1.033,1.07 0.5,1.175 C 0.5,1.175 0.56,0.448 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,221.4841,694.46866)"
      clip-path="url(#clipPath420-7)"
    /><path
      id="path421-8"
      d="m 0,0 c 0.726,-0.784 2.538,-2.128 4.879,-2.295 0.293,-0.021 1.475,0.229 1.475,0.229 0.097,0.691 0.754,0.71 0.754,0.71 0,0 -0.909,0.031 -1.568,0.051 -0.658,0.021 -1.82,0.047 -2.481,0.357 -0.436,0.204 -1.444,0.835 -1.741,1.013 -0.295,0.18 -0.289,0.624 0.237,0.41 0.349,-0.143 1.189,-0.721 2.071,-1.124 0.952,-0.434 1.697,-0.247 2.115,-0.244 0.035,0.132 -1.2,0.417 -1.979,0.933 -0.808,0.533 -1.455,1.43 -1.455,1.43 0,0 -1.691,0.023 -2.194,0.101 C -0.88,1.724 -1.125,1.216 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,199.51049,690.63643)"
      clip-path="url(#clipPath422-7)"
    /><path
      id="path423-5"
      d="M 0,0 C 0,0 -0.012,-0.001 -0.027,-0.001 -0.041,-0.009 0,0 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,223.60282,691.09397)"
      clip-path="url(#clipPath424-6)"
    /><path
      id="path425-9"
      d="m 0,0 c 0.056,-0.448 0.805,-1.21 0.905,-1.316 0.102,-0.106 0.797,-0.822 1.108,-1.175 0.35,-0.397 0.78,-0.966 0.78,-0.966 l 0.42,0.053 c 0.02,0.367 -0.49,1.231 -0.555,1.37 -0.066,0.14 -1.172,2.4 -1.572,2.928 -0.399,0.527 0.157,0.601 0.385,0.32 0.467,-0.575 1.399,-1.478 1.987,-4.162 0.214,-0.978 0.39,-0.59 0.39,-0.59 0,0 0.121,0.266 0.177,1.019 0.2,2.64 -0.27,2.87 -0.442,3.199 C 3.273,1.274 2.454,1.879 1.873,2.104 1.289,2.328 0.113,2.681 -0.642,2.945 -1.398,3.208 -0.831,2.484 -0.561,1.885 -0.232,1.16 -0.056,0.449 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,212.60343,681.27775)"
      clip-path="url(#clipPath426-6)"
    /><path
      id="path427-7"
      d="m 0,0 c 0.743,-0.676 1.077,-1.134 2.666,-1.424 1.588,-0.289 1.73,-0.191 1.73,-0.191 0,0 0.525,0.088 0.118,0.445 C 4.109,-0.815 3.26,-0.55 2.985,-0.438 2.712,-0.327 2.185,-0.132 1.69,0.187 1.429,0.356 0.787,0.813 0.235,1.272 -0.218,1.649 -0.793,2.135 -0.884,2.584 -0.974,3.034 -0.585,3.099 0.209,2.262 0.668,1.778 0.974,1.526 1.267,1.304 2.101,0.672 2.469,0.494 3.305,0.007 c 0.45,-0.262 1.546,-0.63 1.546,-0.63 0,0 0.328,0.37 0.468,0.4 0,0 -0.351,0.82 -1.347,1.618 -0.841,0.672 -1.352,1.598 -1.371,1.609 0,0 -1.255,0.188 -2.485,0.559 -1.109,0.336 -2.378,1.538 -2.429,1.01 C -2.35,4.195 -2.102,3.002 -1.639,2.232 -1.177,1.461 -0.743,0.676 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,206.4559,688.53429)"
      clip-path="url(#clipPath428-9)"
    /><path
      id="path429-5"
      d="m 0,0 c -0.018,-0.581 -0.508,-1.037 -1.095,-1.019 -0.587,0.018 -1.048,0.503 -1.03,1.084 0.019,0.581 0.509,1.038 1.095,1.019 C -0.443,1.066 0.019,0.581 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,218.22784,696.18736)"
      clip-path="url(#clipPath430-8)"
    /><path
      id="path431-3"
      d="m 0,0 c -0.02,-0.622 -0.545,-1.111 -1.173,-1.092 -0.629,0.019 -1.123,0.54 -1.104,1.162 0.019,0.623 0.545,1.112 1.173,1.092 C -0.476,1.143 0.02,0.623 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,221.64681,691.99341)"
      clip-path="url(#clipPath432-2)"
    /><path
      id="path433-8"
      d="m 0,0 c -0.02,-0.623 -0.544,-1.111 -1.173,-1.092 -0.629,0.019 -1.123,0.54 -1.104,1.162 0.019,0.622 0.545,1.112 1.173,1.092 C -0.476,1.143 0.02,0.623 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,242.8887,721.79741)"
      clip-path="url(#clipPath434-3)"
    /><path
      id="path435-8"
      d="m 0,0 c -0.019,-0.623 -0.544,-1.111 -1.173,-1.092 -0.629,0.019 -1.123,0.539 -1.103,1.162 0.018,0.622 0.544,1.111 1.172,1.092 C -0.475,1.143 0.02,0.623 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,241.99633,748.45231)"
      clip-path="url(#clipPath436-0)"
    /><path
      id="path437-3"
      d="m 0,0 c -0.02,-0.623 -0.545,-1.112 -1.174,-1.092 -0.628,0.019 -1.122,0.539 -1.103,1.162 0.019,0.622 0.545,1.111 1.173,1.092 C -0.476,1.143 0.019,0.623 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,228.86019,774.50006)"
      clip-path="url(#clipPath438-8)"
    /><path
      id="path439-1"
      d="m 0,0 c -0.018,-0.559 -0.489,-0.998 -1.054,-0.981 -0.564,0.018 -1.008,0.485 -0.991,1.044 0.018,0.559 0.489,0.998 1.054,0.98 C -0.427,1.026 0.018,0.559 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,233.22502,746.24803)"
      clip-path="url(#clipPath440-0)"
    /><path
      id="path441-8"
      d="m 0,0 c -0.02,-0.623 -0.545,-1.111 -1.174,-1.092 -0.628,0.019 -1.123,0.54 -1.103,1.162 0.019,0.622 0.544,1.112 1.173,1.092 C -0.476,1.143 0.019,0.623 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,226.77661,765.71856)"
      clip-path="url(#clipPath442-6)"
    /><path
      id="path443-9"
      d="M 0,0 C -0.018,-0.581 -0.508,-1.036 -1.094,-1.018 -1.681,-1 -2.141,-0.515 -2.123,0.065 -2.105,0.646 -1.615,1.102 -1.029,1.083 -0.443,1.065 0.018,0.581 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,226.14793,688.92893)"
      clip-path="url(#clipPath444-8)"
    /><path
      id="path445-6"
      d="m 0,0 c -0.309,-0.235 -2.556,-0.35 -5.093,-0.278 -0.717,0.021 -1.036,0.294 -1.178,0.316 -0.144,0.024 0,0 0,0 0.881,-0.037 2.659,0.042 2.927,0.073 1.433,0.166 2.811,0.139 3.18,0.07 C -0.047,0.16 0.307,0.233 0,0 m -6.782,2.36 c 0.248,0.521 0.83,1.937 1.106,2.49 0.352,0.704 0.967,1.506 1.408,2.089 0.23,0.305 1.872,1.686 1.603,1.303 C -2.846,7.984 -3.088,7.826 -3.429,7.437 -3.709,7.117 -3.813,6.984 -4.189,6.488 -4.488,6.093 -5.012,5.198 -5.222,4.798 -5.42,4.421 -5.709,3.787 -5.979,3.258 -6.061,3.101 -6.267,2.501 -6.524,2.063 -6.667,1.821 -6.776,1.412 -7.056,1.38 c 0,0 -0.114,0.167 0.274,0.98 M 2.972,0.334 c 0,0 -1.18,0.214 -1.905,0.492 -0.725,0.277 -1.701,0.423 -2.752,0.436 -1.049,0.012 -2.831,-0.303 -3.736,-0.386 -0.668,-0.06 -0.236,0.57 -0.109,0.836 0.724,1.514 2.328,4.034 3.182,5.419 0.497,0.806 1.424,2.453 1.211,2.705 C -1.232,9.95 -3.264,8.987 -3.799,8.548 -4.413,8.045 -6.933,6.219 -8.146,2.013 -8.294,1.498 -8.713,1.142 -9.169,0.897 -9.205,0.89 -9.241,0.882 -9.281,0.875 c -1.271,-0.234 -3.188,-0.543 -3.946,-0.791 -0.404,-0.132 -0.115,-0.2 0.352,-0.455 0.248,-0.134 0.736,-0.521 1.08,-0.547 0.434,-0.033 3.064,0.381 3.784,0.235 4.643,-1.652 8.848,-0.171 8.848,-0.171 0,0 1.178,0.459 1.86,0.752 0.684,0.293 0.275,0.436 0.275,0.436"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,215.52382,787.05216)"
      clip-path="url(#clipPath446-6)"
    /><path
      id="path447-4"
      d="M 0,0 C 0.197,0.386 0.458,0.845 0.748,1.362 1.234,2.234 1.356,2.94 1.542,2.799 1.729,2.658 1.522,2.242 1.273,1.476 1.139,1.062 0.518,-0.093 0.325,-0.422 0.138,-0.739 -0.587,-1.965 -1.939,-3.646 c -0.19,-0.236 -1.297,-1.055 -1.48,-0.932 -0.135,0.091 0.683,0.616 1.277,1.38 0,0 0.765,1.017 1.115,1.563 C -0.471,-0.767 -0.142,-0.279 0,0 m -4.659,-4.758 c -0.095,-0.189 -0.76,-0.77 0.091,-0.582 0.85,0.19 1.278,0.171 2.005,0.464 0.871,0.351 1.423,1.116 2.097,1.743 0.673,0.627 1.983,2.581 2.208,3.385 0.586,2.08 1.324,4.831 0.169,4.792 C 1.615,5.034 0.919,3.589 0.533,3.042 0.269,2.668 -0.905,1.448 -1.181,1.082 -2.316,-0.423 -4.22,-3.882 -4.659,-4.758"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,215.44151,772.90799)"
      clip-path="url(#clipPath448-1)"
    /><path
      id="path449-3"
      d="m 0,0 c -0.818,-0.392 -7.86,-2.223 -6.636,-2.439 0.18,-0.031 3.154,0.477 3.823,-0.923 0,0 4.424,2.096 4.708,2.341 C 2.405,-0.579 0.545,0.261 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,173.59655,790.72779)"
      clip-path="url(#clipPath450-9)"
    /><path
      id="path451-3"
      d="M 0,0 C -0.645,0.338 -0.772,0.434 -1.277,0.703 -1.496,0.819 -1.837,0.936 -2.031,0.958 -2.396,1.001 -2.867,0.924 -3.143,0.856 -3.74,0.708 -4.351,0.5 -4.088,0.288 c 0.224,-0.183 0.204,-0.135 1.355,-0.812 1.119,-0.649 5.383,-3.442 5.383,-3.442 0.668,1.4 3.455,0.881 3.634,0.913 C 7.428,-2.852 2.739,-1.473 0,0"
      style="fill:#e1261c;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,189.76451,789.22331)"
      clip-path="url(#clipPath452-4)"
    /><path
      id="path453-3"
      d="M 0,0 C 0.002,0.291 0.53,0.592 2.131,0.456 3.183,0.366 3.866,0.144 3.871,-0.425 3.873,-0.642 3.661,-1.087 1.563,-1.041 0.576,-1.02 -0.002,-0.351 0,0"
      style="fill:#0047bb;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,158.46325,797.3299)"
      clip-path="url(#clipPath454-1)"
    /><path
      id="path455-8"
      d="M 0,0 C -0.001,0.292 -0.832,0.562 -2.136,0.469 -3.188,0.393 -3.803,0.163 -3.871,-0.425 -3.896,-0.64 -3.661,-1.087 -1.563,-1.041 -0.576,-1.019 0.002,-0.35 0,0"
      style="fill:#e1261c;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,204.4589,797.10008)"
      clip-path="url(#clipPath456-3)"
    /><path
      id="path457-6"
      d="m 0,0 3.335,-9.784 10.301,-0.035 -8.255,-6.13 3.128,-9.819 -8.406,5.956 -8.352,-6.021 3.067,9.841 -8.313,6.079 10.287,0.094 z"
      style="fill:#f8bf00;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:2.42851"
      transform="matrix(2.1103765,0,0,-2.1103765,180.12774,706.09938)"
      clip-path="url(#clipPath458-4)"
    />
    </g><text
      id="text1485"
      xml:space="preserve"
      x="173.77298"
      y="587.26263"
      transform="scale(1.0074641,0.99259118)"
    ><tspan
      id="tspan1485"
      x="173.77298"
      y="587.26263"
      class="text-subtitle"
    >INSTITUTO</tspan></text><text
      id="text1485-4"
      xml:space="preserve"
      style="font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;font-size:8.56615px;line-height:7.8;font-family:Gotham;-inkscape-font-specification:'Gotham, Medium';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;letter-spacing:-0.0142847px;word-spacing:3.89776px;fill:#252525;fill-opacity:1;stroke:none;stroke-width:0.400001;stroke-linecap:round"
      x="313.15143"
      y="587.26929"
      transform="scale(1.0074641,0.99259119)"
    ><tspan
      id="tspan1485-4"
      x="313.15143"
      y="587.26929"
      class="text-subtitle"
    >PARAGUÁI</tspan></text><text
      id="text1485-6"
      xml:space="preserve"
      style="font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;font-size:8.67434px;line-height:7.8;font-family:Gotham;-inkscape-font-specification:'Gotham, Medium';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;letter-spacing:-0.0144651px;word-spacing:3.94698px;fill:#252525;fill-opacity:1;stroke:none;stroke-width:0.400001;stroke-linecap:round"
      x="171.71407"
      y="637.70538"
      transform="scale(1.0201891,0.98021045)"
    ><tspan
      id="tspan1485-3"
      x="171.71407"
      y="637.70538"
      class="text-subtitle"
    >PARAGUAY</tspan></text><text
      id="text1485-6-8"
      xml:space="preserve"
      style="font-style:normal;font-variant:normal;font-weight:500;font-stretch:normal;font-size:8.67434px;line-height:7.8;font-family:Gotham;-inkscape-font-specification:'Gotham, Medium';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;letter-spacing:-0.0144651px;word-spacing:3.94698px;fill:#252525;fill-opacity:1;stroke:none;stroke-width:0.400001;stroke-linecap:round"
      x="309.69083"
      y="637.78412"
      transform="scale(1.0201891,0.98021043)"
    ><tspan
      id="tspan1485-3-8"
      x="309.69083"
      y="637.78412"
      class="text-subtitle"
    >ÑANGAREKOHA</tspan></text><text
      id="text1486"
      xml:space="preserve"
      class="title-logo"
      x="173.78273"
      y="602.80707"
      transform="scale(1.0076066,0.99245081)"
    ><tspan
      id="tspan1486"
      x="173.78273"
      y="602.80707"
      style="stroke-width:0.400001"
    >PARAGUAYO</tspan></text><text
      id="text1486-4"
      xml:space="preserve"
      class="title-logo"
      x="313.56857"
      y="602.69928"
      transform="scale(1.0076066,0.99245081)"
    ><tspan
      id="tspan1486-92"
      x="313.56857"
      y="602.69928"
      style="stroke-width:0.400001"
    >PARAGUAY</tspan></text><text
      id="text1486-6"
      xml:space="preserve"
      class="title-logo"
      x="175.75145"
      y="613.22876"
      transform="scale(0.99751938,1.0024868)"
    ><tspan
      id="tspan1486-9"
      x="175.75145"
      y="613.22876"
      style="letter-spacing:0.819612px;stroke-width:0.400001"
    >DEL</tspan></text><text
      id="text1486-6-5"
      xml:space="preserve"
      class="title-logo"
      x="213.39355"
      y="608.4696"
      transform="scale(0.99000286,1.0100981)"
    ><tspan
      id="tspan1486-9-2"
      x="213.39355"
      y="608.4696"
      style="letter-spacing:0.813435px;stroke-width:0.400001"
    >INDÍGENA</tspan></text><text
      id="text1486-9"
      xml:space="preserve"
      class="title-logo"
      x="308.94815"
      y="627.88715"
      transform="scale(1.0214738,0.97897762)"
    ><tspan
      id="tspan1486-2"
      x="308.94815"
      y="627.88715"
      style="stroke-width:0.400001"
    >YPYKUÉRA</tspan></text><rect
      id="rect1487"
      style="fill:#252525;fill-opacity:1;stroke:#000000;stroke-width:1;stroke-linecap:round;stroke-dasharray:none;stroke-opacity:1"
      width="0.14552188"
      height="47.716274"
      x="308.61639"
      y="577.08539"
    /></g></svg>
</template>

<style lang="scss" scoped>
.right {
  font-style:normal;
  font-variant:normal;
  font-weight:500;
  font-stretch:normal;
  font-size:8.56615px;
  line-height:7.8;
  font-family:Gotham;
  -inkscape-font-specification:'Gotham, Medium';
  font-variant-ligatures:normal;
  font-variant-caps:normal;
  font-variant-numeric:normal;
  font-variant-east-asian:normal;
  letter-spacing:-0.0142847px;
  word-spacing:3.89776px;
  fill:#252525;fill-opacity:1;
  stroke:none;
  stroke-width:0.400001;
  stroke-linecap:round
}

.title-logo {
  font-style:normal;
  font-variant:normal;
  font-weight:bold;
  font-stretch:normal;
  font-size:17.8408px;
  line-height:7.8;
  font-family:'Garamond Premier Pro';
  -inkscape-font-specification:'Garamond Premier Pro, Bold';
  font-variant-ligatures:normal;
  font-variant-caps:normal;
  font-variant-numeric:normal;
  font-variant-east-asian:normal;
  letter-spacing:-0.023894px;
  word-spacing:8.23863px;
  fill: var(--dark-sidebar);
  stroke:none;
  stroke-width:0.400001;
  stroke-linecap:round;
  stroke-opacity:1
}

.text-subtitle {
  font-style:normal;
  font-variant:normal;
  font-weight:500;
  font-stretch:normal;
  font-size:8.56615px;
  line-height:7.8;
  font-family:Gotham;
  -inkscape-font-specification:'Gotham, Medium';
  font-variant-ligatures:normal;
  font-variant-caps:normal;
  font-variant-numeric:normal;
  font-variant-east-asian:normal;
  letter-spacing:-0.0142847px;
  fill: var(--dark-sidebar);
  stroke:none;
  stroke-width:0.400001;
  stroke-opacity:1
}

.bottom {
  fill: var(--primary);
}

.left {
  fill: var(--primary-light-15);
}

.is-roll,
svg:hover {
  .right {
    animation: is-roll-right 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 0s;
  }

  .left {
    animation: is-roll-left 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 0s;
  }

  .bottom {
    animation: is-roll-bottom 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 0s;
  }
}

.is-dark {
  .text-subtitle, .title-logo {
    fill: var(--light-text-light-6);
  }

  .bottom {
    fill: #fffc;
    animation: none;
  }

  .left {
    fill: #fffa;
    animation: none;
  }
}

@keyframes is-roll-right {
  0% {
    fill: var(--primary-dark-7);
  }

  33% {
    fill: var(--primary-light-8);
  }

  66% {
    fill: var(--primary-light-40);
  }

  100% {
    fill: var(--primary-dark-7);
  }
}

@keyframes is-roll-bottom {
  0% {
    fill: var(--primary);
  }

  33% {
    fill: var(--primary-light-24); // darken(#1ee8c0, 7%);
  }

  66% {
    fill: var(--primary-light-20);
  }

  100% {
    fill: var(--primary);
  }
}

@keyframes is-roll-left {
  0% {
    fill: var(--primary-light-15);
  }

  33% {
    fill: var(--primary-light-12); // lighten(#1ee8c0, 15%);
  }

  66% {
    fill: var(--primary-light-15);
  }

  100% {
    fill: var(--primary-light-15);
  }
}
</style>
