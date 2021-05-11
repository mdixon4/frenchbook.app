<template>
  <div>File system! <button @click="pickDirectory">Pick directory</button></div>
</template>

<script setup>
// import {  } from 'vue'

const pickDirectory = async () => {
  let directoryHandle = await window.showDirectoryPicker()
  let files = await listAllFilesAndDirs(directoryHandle)
  console.log(directoryHandle, files)
}

async function listAllFilesAndDirs(dirHandle) {
  const files = [];
  for await (let [name, handle] of dirHandle) {
    const {kind} = handle;
    if (handle.kind === 'directory') {
      files.push({name, handle, kind});
      files.push(...await listAllFilesAndDirs(handle));
    } else {
      files.push({name, handle, kind});
    }
  }
  return files;
}


</script>

<style>

</style>