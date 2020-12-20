<template>
    <div>
        <span v-if="this.title != undefined || this.title != null || this.title != ''">
            {{ title }}: 
        </span>
        <label class='switch'>
            <input type='checkbox' @click="handleStatusChanged">
            <span class='slider' />
        </label>
        <span v-if="this.checked">{{ valueTrue }}</span>
        <span v-else>{{ valueFalse }}</span>
    </div>
</template>

<script>
export default {
    name: 'ToggleSwitch',
    props: ['valueTrue', 'valueFalse', 'title'],
    data() {
        return {
            checked: false
        }
    },
    methods: {
        handleStatusChanged: function(event) {
            this.checked = event.target.checked;
            this.$emit('switched', {status: this.checked});
        }
    }
}
</script>

<style scoped>

    .switch {
        width: 60px;
        height: 24px;
        background-color: black;
        display: inline-block;
        position: relative;
        border-radius: 100px;
        padding: 0;
    }

    .switch input {
        display: none;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: 0;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: '';
        background-color: white;
        border-radius: 50%;
        left: 4px;
        top: 4px;
        height: 16px;
        width: 16px;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .switch input:checked + .slider:before {
        -webkit-transform: translateX(34px);
        -ms-transform: translateX(34px);
        transform: translateX(34px);
    }

</style>