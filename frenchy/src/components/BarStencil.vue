<template>
  <svg class="bar-stencil" viewBox="0 0 100 100">
    <g class="stops" fill="var(--stop-color)">
      <rect class="stop-on-1 is-not-slashed" x="0" y="0" width="50" height="50"></rect>
      <rect class="stop-on-2 is-not-slashed" x="50" y="0" width="50" height="50"></rect>
      <rect class="stop-on-3 is-not-slashed" x="0" y="50" width="50" height="50"></rect>
      <rect class="stop-on-4 is-not-slashed" x="50" y="50" width="50" height="50"></rect>
      <path class="stop-on-1 stop-on-2 is-slashed" d="M 0 0 100 0 0 100 0 0"></path>
      <path class="stop-on-3 stop-on-4 is-slashed" d="M 100 0 100 100 0 100 100 0"></path>
    </g>
    <g class="borders" fill="transparent" stroke="var(--gridline-color)" stroke-width="var(--stroke-width)">
      <!-- top -->
      <path class="top-border" d="M 0 0 100 0"></path>
      <!-- bottom -->
      <path class="bottom-border" d="M 0 100 100 100"></path>
      <!-- left -->
      <path class="left-border-inset" d="M 2 0 2 100"></path>
      <path class="left-border-default" d="M 0 0 0 100"></path>
      <g class="left-border-repeat">
        <circle cx="7" cy="40" r="2" fill="var(--gridline-color)"></circle>
        <circle cx="7" cy="60" r="2" fill="var(--gridline-color)"></circle>
      </g>
      <svg class="left-border-bracket" x="4" y="3">
        <path d="M9 94C3.4 91.4236 1 90.3195 1 82.9585C1 75.5976 1 68.2365 1 68.2365C1 68.2365 1 41.4278 1 24.25C1 19.0616 1 10.9643 1 10.9643C1 4.32145 3.19998 3.32503 8.33325 1.00004"/>
      </svg>
      <!-- right -->
      <path class="right-border-inset" d="M 98 0 98 100"></path>
      <path class="right-border-default" d="M 100 0 100 100"></path>
      <g class="right-border-repeat">
        <circle cx="93" cy="40" r="2" fill="var(--gridline-color)"></circle>
        <circle cx="93" cy="60" r="2" fill="var(--gridline-color)"></circle>
      </g>
      <svg class="right-border-bracket" x="96" y="3" style="overflow: visible">
        <g transform="scale(-1,1)">
          <path d="M9 94C3.4 91.4236 1 90.3195 1 82.9585C1 75.5976 1 68.2365 1 68.2365C1 68.2365 1 41.4278 1 24.25C1 19.0616 1 10.9643 1 10.9643C1 4.32145 3.19998 3.32503 8.33325 1.00004"/>
        </g>
      </svg>
    </g>
    <g class="internal-borders" fill="transparent" stroke="var(--gridline-color)" stroke-width="var(--stroke-width)">
      <path class="╱" d="M 100 0, 0 100"></path>
      <path class="(╱)" d="M 93 7, 7 93"></path>
      <path class="┘" d="M 50 0, 50 50, 0 50"></path>
      <path class="┴" d="M 50 0, 50 50 M 0 50, 100 50"></path>
      <path class="┼" d="M 50 0 50 100 M 0 50 100 50"></path>
      <path class="┬" d="M 0 50 100 50 M 50 50 50 100"></path>
      <path class="┌" d="M 100 50 50 50 50 100"></path>
    </g>
    <g class="extra-borders" fill="transparent" stroke="var(--gridline-color)" stroke-width="var(--stroke-width)">
      <path class="thick-top-border" d="M -2 -2 102 -2"></path>
      <path class="thick-right-border" d="M 102 -2 102 102"></path>
      <path class="thick-bottom-border" d="M 102 102 -2 102"></path>
      <path class="thick-left-border" d="M -2 102 -2 -2"></path>
    </g>
  </svg>
</template>

