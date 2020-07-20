<template>
    <div class="pl-filters">
<!--        <div class="pl-filters__local">-->
<!--            <h4>LOCAL</h4>-->
<!--            <div class="pl-filters__select" @click="togleSelect()">-->
<!--                <div class="pl-filters__dropdown">-->
<!--                    <span id="selectFieldState">Estado</span>-->
<!--                    <img :src="link" alt="" />-->
<!--                </div>-->
<!--                <div id="dropdown" class="pl-filters__dropdown&#45;&#45;content">-->
<!--                    <li value="test1" @click="selectInList('Paraíba')">-->
<!--                        Paraíba-->
<!--                    </li>-->
<!--                    <li value="test1" @click="selectInList('Pernambuco')">-->
<!--                        Pernambuco-->
<!--                    </li>-->
<!--                    <li value="test1" @click="selectInList('São Paulo')">-->
<!--                        São Paulo-->
<!--                    </li>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="pl-filters__select" @click="togleSelect2()">-->
<!--                <div class="pl-filters__dropdown">-->
<!--                    <span id="selectFieldCity">Cidade</span>-->
<!--                    <img :src="link2" alt="" />-->
<!--                </div>-->
<!--                <div id="dropdown2" class="pl-filters__dropdown&#45;&#45;content">-->
<!--                    <li value="test1" @click="selectInList2('João Pessoa')">-->
<!--                        João Pessoa-->
<!--                    </li>-->
<!--                    <li value="test1" @click="selectInList2('Recife')">-->
<!--                        Recife-->
<!--                    </li>-->
<!--                    <li value="test1" @click="selectInList2('São Paulo')">-->
<!--                        São Paulo-->
<!--                    </li>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <div class="pl-filters__relevance">
            <h4>RELEVÂNCIA</h4>
            <ul>
                <li @click="selectInline('nextToEnd')"
                    id="nextToEnd"
                    :style="[filters.relevancia === 'nextToEnd' ? {'color': '#FFB119'} : {'color': '#949494'}]"
                >
                    Próximos de encerrar
                </li>
                <li @click="selectInline('lowestBidPrice')"
                    id="lowestBidPrice"
                    :style="[filters.relevancia === 'lowestBidPrice' ? {'color': '#FFB119'} : {'color': '#949494'}]"
                >
                    Menor preço de lance
                </li>
                <li
                    @click="selectInline('highestBidPrice')"
                    id="highestBidPrice"
                    :style="[filters.relevancia === 'highestBidPrice' ? {'color': '#FFB119'} : {'color': '#949494'}]"
                >
                    Maior preço de lance
                </li>
                <li
                    @click="selectInline('biggestQuantity')"
                    id="biggestQuantity"
                    :style="[filters.relevancia === 'biggestQuantity' ? {'color': '#FFB119'} : {'color': '#949494'}]"
                >
                    Maior quantidade
                </li>
                <li
                    @click="selectInline('smallestQuantity')"
                    id="smallestQuantity"
                    :style="[filters.relevancia === 'smallestQuantity' ? {'color': '#FFB119'} : {'color': '#949494'}]"
                >
                    Menor quantidade
                </li>
            </ul>
        </div>
        <div class="pl-filters__category">
            <h4>CATEGORIA</h4>
            <div class="pl-filters__category--box">
                <span
                    class="pl-filters__category--item"
                    @click="select('etanol')"
                    id="etanol"
                >
                    ETANOL
                </span>
                <span
                    class="pl-filters__category--item"
                    @click="select('gasolina')"
                    id="gasolina"
                >
                    GASOLINA comum
                </span>
                <span
                    class="pl-filters__category--item"
                    @click="select('gasolinaAdtv')"
                    id="gasolinaAdtv"
                >
                    GASOLINA adtivada
                </span>
                <span
                    class="pl-filters__category--item"
                    @click="select('diesels10')"
                    id="diesels10"
                >
                    DIESELS10
                </span>
                <span
                    class="pl-filters__category--item"
                    @click="select('diesels500')"
                    id="diesels500"
                >
                    DIESELS500
                </span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: () => ({
        link: "images/icons/other-icons/expand-grey.svg",
        link2: "images/icons/other-icons/expand-grey.svg",
        filtersClicked: {
            relevancia: false
        },
        filters: {
            status: 1,
            page: 1,
            search: [],
            cidade: "",
            estado: "",
            relevancia: ""
        }
    }),
    methods: {
        select(param) {
            //select function for inline buttons - category
            // console.log(this);
            let paramFormatted = null;
            switch (param) {
                case "etanol":
                    paramFormatted = 'fuel.name:etanol';
                    break;
                case "gasolina":
                    paramFormatted = 'fuel.name:gasolina comum';
                    break;
                case "gasolinaAdtv":
                    paramFormatted = 'fuel.name:gasolina adiivada';
                    break;
                case "diesels10":
                    paramFormatted = 'fuel.name:diesel s10';
                    break;
                case "diesels500":
                    paramFormatted = 'fuel.name:diesel s500';
                    break;
            }
            if (!this.filters.search.includes(paramFormatted)) {
                this.filters.search.push(paramFormatted);
            } else {
                this.filters.search = this.filters.search.filter(
                    categoria => categoria !== paramFormatted
                );
            }
            this.filters.searchFields = "fuel.name:like";
            this.$store.commit("auction/setConcat", false);
            this.$store.commit("auction/setFilters", this.filters);
            // console.log('Setando os filtros', this.filters);
            this.refreshAuctions();
            let selected = param;
            let element = document.getElementById(selected);
            if (element.style.backgroundColor == "rgb(255, 177, 25)") {
                element.style =
                    "background-color: transparent; color: #949494 ;";
                return;
            }
            element.style.cssText = "background-color: #FFB119; color: white;";
        },
        togleSelect() {
            var selector = document.getElementById("dropdown");
            selector.classList.toggle("show");
            if (this.link == "images/icons/other-icons/expand-grey.svg") {
                this.link = "images/icons/other-icons/expand.svg";
                return;
            } else if (this.link == "images/icons/other-icons/expand.svg") {
                this.link = "images/icons/other-icons/expand-grey.svg";
            }
        },
        togleSelect2() {
            var selector = document.getElementById("dropdown2");
            selector.classList.toggle("show");
            if (this.link2 == "images/icons/other-icons/expand-grey.svg") {
                this.link2 = "images/icons/other-icons/expand.svg";
                return;
            } else if (this.link2 == "images/icons/other-icons/expand.svg") {
                this.link2 = "images/icons/other-icons/expand-grey.svg";
            }
        },
        selectInList(param) {
            var label = document.getElementById("selectFieldState");
            label.innerHTML = param;
        },
        selectInList2(param) {
            var label = document.getElementById("selectFieldCity");
            label.innerHTML = param;
        },
        selectInline(param) {
            if (param === this.filters.relevancia) {
                this.filters.relevancia = '';
                this.filtersClicked.relevancia = false;
            } else {
                this.filters.relevancia = param;
                this.filtersClicked.relevancia = true;
                this.$store.commit("auction/setFilters", this.filters);
                this.refreshAuctions();
            }
        },
        getDispatchName() {
            const urlAtual = window.location.pathname;
            let dispatchName = "";
            switch (urlAtual) {
                case "/distributor-feed":
                    dispatchName = "auction/fetchLot";
                    break;
                case "/bids":
                    dispatchName = "auction/fetchDistributorAuctionsWins";
                    break;
                case "/station-feed":
                    dispatchName = "auction/fetchLot";
                    break;
                case "/auctions":
                    dispatchName = "auction/fetchAuctions";
            }
            return dispatchName;
        },
        refreshAuctions() {
            console.log("calling refresh");
            this.$store.dispatch(this.getDispatchName(), { fromFilters: true });
        }
    }
};
</script>
<style lang="scss">
.show {
    display: block !important;
}
.pl-filters {
    display: flex;
    align-items: center;
    align-content: center;
    @include grid-media($smartphone-grid) {
        display: block;
        background-color: #ffffff;
        padding: 15px 30px 15px 15px;
        width: 100%;
    }
    &__select {
        position: relative;
    }
    &__dropdown--content {
        //dropdown items
        list-style: none;
        position: absolute;
        display: none;
        width: 100%;
        color: $yellow;
        background-color: #ffffff;
        border: 1px solid $yellow;
        z-index: 20;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        li {
            padding: 10px;
            text-transform: uppercase;
            &:hover {
                background-color: $yellow;
                color: #ffffff;
            }
        }
    }
    h4 {
        text-transform: uppercase;
        font-weight: 400;
        margin-bottom: 10px;
        color: #333333;
    }
    &__local {
        width: 20%;
        @include grid-media($smartphone-grid) {
            width: 100%;
            min-height: 120px;
        }

        min-height: 200px;
        margin: 0 10px 0 10px;
    }
    &__relevance {
        width: 20%;
        @include grid-media($smartphone-grid) {
            width: 100%;
            min-height: 120px;
        }
        @include grid-media($large-desktop-grid) {
            width: 15%;
        }
        min-height: 200px;
        margin: 0 10px 0 10px;

        ul {
            padding: 0;
            font-weight: 500;
            margin-top: 0;
            li {
                list-style: none;
                cursor: pointer;
                color: #949494;
                margin-bottom: 6px;
                padding: 0;
                margin-top: 0px;
                text-transform: uppercase;
            }
        }
    }
    &__category {
        width: 30%;
        @include grid-media($smartphone-grid) {
            display: block;
            width: 100%;
        }
        height: 200px;
        margin: 0 10px 0 10px;
        &--box {
            width: 80%;
        }
        &--item {
            padding: 5px;
            border: 1px solid #949494;
            color: #949494;
            text-transform: uppercase;
            display: inline-block;
            cursor: pointer;
            margin: 0px 5px 5px 0px;
            &:active {
                background-color: $yellow;
                color: #ffffff;
            }
            &:focus {
                background-color: $yellow;
                color: #ffffff;
            }
        }
    }
    //dropdown
    &__dropdown {
        margin-top: 10px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid #949494;
        padding-left: 10px;
        padding-right: 10px;
        height: 32px;
        margin-bottom: 0 !important;
        line-height: 14px;
        font-weight: 500;
        text-transform: uppercase;
        color: #949494;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover,
        &:focus {
            border-color: $yellow;
            color: $yellow;
        }
        span {
            width: 90%;
            text-align: left;
        }
        img {
            width: 10%;
            height: 30px;
        }
        li {
            &:hover {
                background-color: $yellow;
                color: #ffffff;
                cursor: pointer;
            }
        }
    }
}
</style>
