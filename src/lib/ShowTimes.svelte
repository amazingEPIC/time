<script>
    import apiURL from './apiURL.js'
    import { onMount } from 'svelte'
    import TimeBar from './TimeBar.svelte'

    const searchParams = new URLSearchParams(window.location.search);
    const myUUID = localStorage.getItem('uuid')
    const otherUUID = searchParams.get('otherUUID');
    let myTimeData = {start: new Date(), end: new Date()};
    let otherTimeData = {start: new Date(), end: new Date()};

    const getTimes = async (uuid) => {
      const data = await (await fetch(`${apiURL}/getTimes?uuid=${uuid}`, {
        headers: { "Content-Type": "application/json" }
      })).json()

      return {
        start: new Date(new Date(data.start).setSeconds(0)),
        end: new Date(new Date(data.end).setSeconds(0))
      }
    }
    
    const convertToTimeStr = (timeData) => timeData.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    
    // When myUUID is defined
    if (myUUID !== null) {
      (async () => {
        myTimeData = await getTimes(myUUID)
        otherTimeData = await getTimes(otherUUID)
      })()
    }

    // let myStartNum = Number(myTimeData.start) % 86_400_000
    // let myEndNum = Number(myTimeData.end) % 86_400_000
    // let otherStartNum = Number(otherTimeData.start) % 86_400_000
    // let otherEndNum = Number(otherTimeData.end) % 86_400_000
    
    // // If end is before beginning, add 24 hours to end to make it after
    // if (myEndNum - myStartNum < 0) {
    //   myEndNum += 86_400_000;
    // }
    // if (otherEndNum - otherStartNum < 0) {
    //   otherEndNum += 86_400_000;
    // }

    // let startInterval = Math.max(myStartNum, otherStartNum)
    // let endInterval = Math.min(myEndNum, otherEndNum)
</script>

{#if myUUID === otherUUID}
<span style="color: red; font-weight: bold;">You're looking at your own availability!</span>
{/if}

{#if myUUID !== null}
<h1>Time availability</h1>

<h2>You're available from {convertToTimeStr(myTimeData.start)} - {convertToTimeStr(myTimeData.end)}</h2>
<!--<h3>My UUID: {myUUID}</h3>-->
<!-- <h3>My Time Data: {JSON.stringify({myTimeData})}</h3> -->
<!-- <h3>Start: {myTimeData.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</h3>
<h3>End: {myTimeData.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</h3> -->


<h2>The other person is available from: {convertToTimeStr(otherTimeData.start)} - {convertToTimeStr(otherTimeData.end)} </h2>
<!--<h3>Other UUID: {otherUUID}</h3>-->
<!-- <h3>Other Time Data: {JSON.stringify({otherTimeData})}</h3> -->
<!-- <h3>Start: {otherTimeData.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</h3>
<h3>End: {myTimeData.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</h3>  -->

<!-- <TimeBar myTime={myTimeData} otherTime={otherTimeData} /> -->

<span style="font-size:0.0625em;">Y o u   w i l l   b e   a v a i l a b l e ............. ʘ ‿ ʘ</span>

{:else}
<p><span style="color: red; font-weight: bold;">You haven't set your own availability yet!</span></p>
<p>To do so, <a href="/">go to the homepage</a></p>
{/if}
<!-- 
<h1>Interval</h1>
{startInterval} - {endInterval} -->