<template>
    <div class="container">
        <span class="selected-option" :class="(darkTheme === 'true')?'dark':'light'" 
            ref="selected_option" @click="openComboBox">
            {{ hint }}
            <img v-if="darkTheme == 'true'" src="../../../public/arrow-dark-theme.svg" ref="arrow" >
            <img v-else src="../../../public/arrow.svg" ref="arrow" >
        </span>
        <div class="options" :class="(darkTheme === 'true')?'dark':'light'"
            ref="options" >
            <span :key="index" v-for="(option, index) in options"
                class="option" :class="(darkTheme === 'true')?'dark':'light'"
                @click="updateSelectedOption" >
                {{ option }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ComboBox',
    props: ['hint', 'options', 'darkTheme', 'showSelectedOption'],
    data() {
        return {
            value: ''
        }
    },
    methods: {
        openComboBox: function() {
            this.$refs.options.classList.toggle('show');
            this.$refs.arrow.classList.toggle('rotated');
        },
        updateSelectedOption: function(event) {
            if(this.showSelectedOption == true) {
                this.$refs.selected_option.childNodes[0].data = event.target.innerText;
            }
            this.value = event.target.innerText;
            this.$refs.options.classList.toggle('show');
            this.$refs.arrow.classList.toggle('rotated');
            this.$emit('selected-option-changed', this.value);
        }
    }
}
</script>

<style scoped>

    img {
        /*position: absolute;
        right: 0;
        top: 0;*/
        width: 1em;
    }

    img.rotated {
        transform: rotateZ(180deg);
    }

    .container {
        position: relative;
        display: inline-block;
    }

    .selected-option {
        padding-left: 0.5rem;
        /*border: 2px solid rgb(131, 131, 131);*/
        box-shadow: 0px 4px 5px;
        border-radius: 2px;
    }

    .selected-option.dark {
        background-color: rgb(0, 0, 0);
        /*border: 2px solid rgb(0, 0, 0);*/
        box-shadow: 0px 0px 0px white;
        color: white;
    }

    .selected-option.light {
        background-color: #E59A30;
        color: black;
    }

    .options {
        position: absolute;
        z-index: 1;
        display: none;
        flex-direction: column;
        width: 100%;
        box-shadow: 0px 8px 16px 0px;
        text-align: left;
    }

    .options.show {
        display: flex;
    }

    .options.light {
        background-color: white;
    }

    .options.dark {
        background-color: rgb(55, 55, 55);
    }

    .option {
        flex: auto;
        padding-left: 0.5rem;
    }

    .option.dark {
        color: white;
    }

    .option.light:hover {
        background-color: rgb(223, 223, 223);
    }

    .option.dark:hover {
        background-color: rgb(75, 75, 75);
    }

</style>