<template lang="pug">
    div
        h1 Oops...
        h3 The {{resource}} you're looking for isn't here.
        router-link(:to='{name: "event-list"}') Back to the home page
</template>
<script>
    export default {
        props: {
            resource: {
                type: String,
                required: true 
            },
        },
    }
</script>

<style scoped>

</style>
