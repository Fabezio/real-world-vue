<template lang="pug">
    div
        h1 Uh-Oh!
        h3 It looks like you're experiencing a network  issue, please click the back button and try again
        router-link(:to='{name: "event-list"}') Or go back to the home page.
</template>
<script>
    export default {}
</script>

<style scoped>

</style>
