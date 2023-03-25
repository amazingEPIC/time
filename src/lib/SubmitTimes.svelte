<script lang="ts">
  import apiURL from './apiURL'

  let startTime: string = '06:40'
  let endTime: string = '22:50'
  let form: HTMLFormElement
  let copyPasteThing;
  let hasGeneratedThisTime = false;

  let uuid: string = localStorage.getItem('uuid')

  const formSubmit = async (e: Event) => {
    const startArry = startTime.split(':')
    const endArry = endTime.split(':')

    // Store the times with 1970-01-01 as the date
    // const startDate = new Date('1970-1-1T00:00:00.000Z')

    const startDate = new Date().setHours(Number(startArry[0]), Number(startArry[1]))
    const endDate = new Date().setHours(Number(endArry[0]), Number(endArry[1]))

    const data = {
      start: startDate,
      end: endDate,
      uuid
    }
    
    // Put the uuid in the variable
    uuid = await (await fetch(`${apiURL}/submitTimes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })).text()

    localStorage.setItem('uuid', uuid)

    hasGeneratedThisTime = true
  }

  const copyPasteString = (str) => {
    const inputElem = document.createElement('input')
    inputElem.value = str
    document.body.appendChild(inputElem)

    inputElem.select()
    document.execCommand('copy')

    document.body.removeChild(inputElem)

    return () => {}
  }
</script>

<form on:submit|preventDefault={formSubmit} >
  <span style="font-size: 2rem;">Enter the range of time that you're available!</span><br>

  <div class="inputWrapWrap">
    <div class="inputWrap">
      <label for="start-time">Start time</label>
      <input id="start-time" type="time" bind:value={startTime}>
    </div>
    to
    <div class="inputWrap">
      <label for="end-time">End time</label>
      <input id="end-time" type="time" bind:value={endTime}>
    </div>
  </div>

  <br>
  <input type="submit" value="Generate link">
</form>
<br>
{#if uuid !== null}
<span style:font-size="1.25em">{hasGeneratedThisTime ? 'Link generated!' : 'You\'ve already generated a link!'}</span><br>
Send this link to the person you want to meet with!<br>
<!-- <input disabled value={`${location.origin}/?otherUUID=${uuid}`}> -->
<button on:click={copyPasteString(`${location.origin}/?otherUUID=${uuid}`)}>Copy link</button>
{/if}

<style>
  .inputWrap {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 0 20px 0;
  }

  .inputWrapWrap {
    display: flex; 
    justify-content: center; 
    align-items: flex-end;
  }
</style>
