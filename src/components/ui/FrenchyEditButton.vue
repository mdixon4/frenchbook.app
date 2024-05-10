<script setup>
import { useUIStore } from '../../store/ui';

const uiStore = useUIStore();

</script>

<template>
  <div id="edit-button-panel" :class="`dockside-${uiStore.dockside}`">
    <div id="edit-button" @click="uiStore.isEditing = true">
      <span>edit</span>
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M5 19h1.098L16.796 8.302l-1.098-1.098L5 17.902zm-1 1v-2.52l13.875-13.9l2.54 2.563L6.52 20zM19 6.112L17.888 5zm-2.763 1.65l-.539-.558l1.098 1.098z" />
        </svg>

      </span>
    </div>
  </div>
</template>

<style>
#edit-button-panel {
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  z-index: 10;
  pointer-events: none;
}

.dockside-left {
  left: 0;
  inset-block: 0;
  position: absolute;
  width: max(15%, 150px);
  display: flex;
  align-items: center;
  justify-content: start;
}

#edit-button {
  background: hsla(0, 0%, 0%, 0.75);
  box-shadow: 0 0 6px 0 hsla(0, 0%, 100%, 0.5),
    0 0 10px 0 hsla(0, 0%, 100%, 0.25),
    0 0 14px 0 hsla(0, 0%, 100%, 0.15);
  height: min(800px, 90%);
  aspect-ratio: 1;
  border-radius: 100%;
  transform: translateX(calc(-100% + 40px));
  transition: all 0.25s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: end;
  opacity: 0.75;
  backdrop-filter: blur(4px);
  pointer-events: all;
}

.dockside-left:hover #edit-button {
  transform: translateX(calc(-100% + 80px));
  opacity: 1;
}

.icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.75;
}
</style>
