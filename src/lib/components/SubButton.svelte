<script lang="ts">
  export let clickHandler: ()=>void
  export let type: "button" |"submit"|"reset" = "button";
</script>

<button class="border-2 p-2 rounded-md border-black bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
{type} on:click={()=>clickHandler()}><slot/></button>