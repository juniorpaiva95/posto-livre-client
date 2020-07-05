<template>
    <div v-if="!isOverdue">
        <pl-badge :class-prop="this.duration.hours() >= 2 ? 'success' : 'warning'">
            <span>{{ this.duration.hours() }}:{{ this.durationMinutes }}:{{ this.durationSeconds }}</span>
        </pl-badge>
    </div>
    <div v-else>
        <pl-badge class="default">
            Finalizado
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
        }
    },
    data() {
        return {
            eventTimeFinish: moment(this.$props.auction.date_finish),
            currentTime: moment(),
            interval: 1000
        };
    },
    created() {
        setInterval(this.refreshCurrentTime, this.interval);
    },
    watch: {
        // auction: function(newValue) {
        //     this.getTimeLeft();
        //     this.getTimeToObject();
        //     this.auctionProp = newValue;
        // }
    },
    destroyed() {
        clearInterval(this.refreshCurrentTime);
    },
    computed: {
        diffTime() {
            return this.eventTimeFinish.unix() - this.currentTime.unix();
        },
        duration: {
            get() {
                return moment.duration(this.diffTime*1000, 'milliseconds');
            },
        },
        durationMinutes() {
            return Math.abs(this.duration.minutes()) < 10 ? '0' + Math.abs(this.duration.minutes()): Math.abs(this.duration.minutes());
        },
        durationSeconds() {
            return Math.abs(this.duration.seconds()) < 10 ? '0' + Math.abs(this.duration.seconds()): Math.abs(this.duration.seconds());
        },
        isOverdue() {
            return this.diffTime < 0;
        }
    },
    methods: {
        refreshCurrentTime() {
            this.currentTime = moment();
        },
    }
};
</script>
