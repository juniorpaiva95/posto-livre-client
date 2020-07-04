<template>
    <div v-if="!isOverdue">
        <pl-badge :class-prop="timeLeftHour >= 2 ? 'success' : 'warning'">
            <span>{{ timeLeft | time }}</span>
        </pl-badge>
    </div>
    <!-- Modo randomico ou finalizado -->
    <div v-else>
        <pl-badge :class-prop="isRandomMode ? 'danger' : 'default'">
            {{ isRandomMode ? "Modo Aleatório" : "Finalizado" }}
        </pl-badge>
    </div>
</template>

<script>
import moment from "moment";
import PlBadge from "./pl-badge";
export default {
    components: { PlBadge },
    props: {
        auction: {
            type: Object
        },
        date: {
            type: Date
        },
        isActive: {
            type: Number
        }
    },
    data() {
        /* console.log("return of date");
        console.log(moment(this.$props.date)); */
        return {
            // auctionProp: this.$props.auction,
            timeLeft: moment(this.$props.date - Date.now()),
            timeLeftHour: "",
            // timeLeftMinute: "",
            // timeLeftSeconds: "",
            // timeLeftMilliseconds: "",
            randomDurationInSeconds: this.$props.auction.randomDurationInSeconds,
            timeLeftInSeconds: this.$props.auction.timeLeftInSeconds,
            expiredTimeLeft: false,
            expiredRandomDuration: false,
            eventIsEmitted: false,
        };
    },
    created() {
        this.auctionProp = this.$props.auction;
        this.getTimeToObject();
        this.getTimeLeft();
        setInterval(this.getTimeLeft, 1000);
    },
    watch: {
        date: function(newDate) {
            this.timeLeft = newDate.date;
        },
        auction: function(newValue) {
            this.getTimeLeft();
            this.getTimeToObject();
            this.auctionProp = newValue;
        }
    },
    destroyed() {
        clearInterval(this.getTimeLeft);
    },
    computed: {
        isRandomMode: {
            get() {
                let overdue = this.timeLeftInSeconds > 0;
                return overdue && this.randomDurationInSeconds < 0;
            },
            set(newName) {
                return newName;
            }
        },
        isOverdue: {
            get() {
                return this.timeLeftInSeconds > 0;
            },
            set(value) {
                return value;
            }
        }
    },
    methods: {
        emitEvent() {
            this.eventIsEmitted = true;
            this.$emit('handleOverdue', true)
        },
        getTimeLeft() {
            this.timeLeft = moment(this.timeLeft).subtract(1, "s");
            this.timeLeftInSeconds++;
            this.randomDurationInSeconds++;
            if (this.timeLeftInSeconds > 0 && !this.expiredTimeLeft) {
                this.expiredTimeLeft = true;
            }

            if (this.randomDurationInSeconds > 0 && !this.expiredRandomDuration) {
                this.expiredRandomDuration = true;
            }

            if (this.isOverdue && !this.isRandomMode && !this.eventIsEmitted) {
                this.emitEvent();
            }
        },
        getTimeToObject() {
            let {
                hours,
                // minutes,
                // seconds,
                // milliseconds
            } = this.timeLeft.toObject();
            this.timeLeftHour = hours;
            // this.timeLeftMinute = minutes;
            // this.timeLeftSeconds = seconds;
            // this.timeLeftMilliseconds = milliseconds;
        }
    }
};
</script>
