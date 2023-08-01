<template>
    <main class="home-view">
        <div class="home-view__paragraph" v-for="idx in $options.PARAGRAPHS">
            <span :id="idx">{{loremText}}</span>
        </div>
    </main>
</template>

<script>
import { LoremIpsum } from "lorem-ipsum";
const PARAGRAPHS = 3
export default {
    PARAGRAPHS,
    name: 'HomeView',
    computed: {
        loremText() {
            const lorem = new LoremIpsum({
                sentencesPerParagraph: {
                    max: 40,
                    min: 20
                },
                wordsPerSentence: {
                    max: 16,
                    min: 4
                }
            });
            // lorem.generateWords(2);
            // lorem.generateSentences(5);
            // lorem.generateParagraphs(7);

            return lorem.generateParagraphs(1)
        }
    }
}
</script>
<style lang="scss">
.home-view{
    @include text-h5;
    &__paragraph {
        margin: 20px 0;
    }
}
</style>