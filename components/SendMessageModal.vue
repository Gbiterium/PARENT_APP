<template>
    <div>
        <ModalWrapper id="send-message" title="Send Message" submit-title="Send Message" @ok="handleSubmit">
            <form>
                <label>Message</label>
                <textarea class="form-control"></textarea>
            </form>
        </ModalWrapper>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>