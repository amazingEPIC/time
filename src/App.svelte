<script>
  import ShowTimes from "./lib/ShowTimes.svelte";
  import SubmitTimes from "./lib/SubmitTimes.svelte"
  const searchParams = new URLSearchParams(window.location.search);
</script>

{#if searchParams.has('otherUUID')}
  <ShowTimes></ShowTimes>
{:else}
  <SubmitTimes></SubmitTimes>
{/if}

