<template>
  <div>
    <v-parallax
      dark
      src="http://localhost:8080/static/img/back.8342ea4.png">
      <v-container class="top-container">
        <v-layout
          row
          wrap>
          <v-flex
            text-xs-center
            xs12>
            <div
              justify-center>
              <h3>Available Budget for  {{ monthName }}</h3>
              <h1 class="display-2 font-weight-thin mb-3">{{ totalBudget }}</h1>
            </div>
          </v-flex>
          <v-flex md3/>
          <v-flex
            xs12
            md6>
            <v-layout
              row
              wrap>
              <v-flex xs12>
                <v-card
                  dark
                  color="#077979">
                  <v-card-text>
                    <v-layout
                      row
                      wrap>
                      <v-flex
                        xs6
                        text-xs-left>
                        <span>INCOME</span>
                      </v-flex>
                      <v-flex
                        xs6
                        text-xs-right>
                        <span>+ {{ totalIncome }}</span>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex
                xs12
                class="total-expense">
                <v-card
                  dark
                  color="#b12f2a">
                  <v-card-text>
                    <v-layout
                      row
                      wrap>
                      <v-flex
                        xs6
                        text-md-left
                        class="total-expense-content">
                        <span>EXPENSE</span>
                      </v-flex>
                      <v-flex
                        xs6
                        text-xs-right>
                        <span>- {{ totalExpense }}</span>
                        <v-chip
                          color="#a2251c"
                          text-color="white">
                          {{ Math.round(expensePercentage) }}%
                        </v-chip>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md3/>
        </v-layout>
      </v-container>
    </v-parallax>
    <v-container id="dropdown-income">
      <v-layout
        row
        wrap>
        <v-flex md2/>
        <v-flex
          xs12
          md8>
          <v-layout
            row
            wrap>
            <v-flex
              xs4
              md2>
              <v-overflow-btn
                v-model="selectedExpenseType"
                :items="expenseType"
                label=""
                target="#dropdown-expense-type"
                outline/>
            </v-flex>
            <v-flex
              xs8
              md7>
              <v-text-field
                v-model="descriptionField"
                label="Add description"
                outline/>
            </v-flex>
            <v-flex
              xs10
              md2>
              <v-text-field
                v-model="valueField"
                label="Value"
                type="number"
                outline
                @keyup.enter.native="onProcessExpense"/>
            </v-flex>
            <v-flex
              xs2
              md1>
              <v-btn
                color="#008080"
                fab
                small
                outline
                @click="onProcessExpense">
                <v-icon>check</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md2/>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout
        row
        wrap>
        <v-flex
          xs12
          md6>
          INCOME
          <v-data-table
            id="income__id"
            :items="incomeList"
            :hide-actions="true"
            :light="true"
            :hide-headers="true"
            class="elevation-0">
            <template
              slot="items"
              slot-scope="props">
              <td>{{ props.item.description }}</td>
              <td class="text-xs-right">{{ props.item.value }}</td>
              <td class="text-xs-right">
                <v-icon
                  small
                  @click="deleteItemIncome(props.item)">
                  delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
        </v-flex>
        <v-flex
          xs12
          md6>
          EXPENSE
          <v-data-table
            id="expense__id"
            :items="expenseList"
            :hide-actions="true"
            :hide-headers="true"
            class="elevation-0">
            <template
              slot="items"
              slot-scope="props">
              <td>{{ props.item.description }}</td>
              <td class="text-xs-right">
                {{ props.item.value }}
              </td>
              <td class="text-xs-right">
                <v-icon
                  small
                  @click="deleteItemExpense(props.item)">
                  delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>
.v-content {
  padding-top: 0px !important;
}
.v-parallax__content {
  background-color: rgba(0, 0, 0, 0.47);
}
.total-expense {
  padding-top: 10px;
}
.top-container {
  max-height: 250px;
}
.elevation-0 {
  padding: 10px;
}
.total-expense .v-card .v-card__text {
  padding: 10px;
}
.total-expense-content {
  margin: 0;
  padding-top: 10px;
  padding-left: 8px;
}
#dropdown-income .v-autocomplete {
  padding-top: 0px;
  margin-top: 0px;
}
#dropdown-income .v-overflow-btn .v-select__selection--comma:first-child {
  margin-left: 9px !important;
  margin-top: 38px !important;
}
.v-toolbar__content {
  background-color: #008080;
}
.v-footer .blue-grey.darken-2 {
  background-color: #008080;
}
.v-input .v-input__slot {
  border: 1px solid gray !important;
  border-radius: 0px !important;
}
#dropdown-income .flex {
  padding: 10px;
}
</style>

<script>
export default {
  name: 'Main',
  data() {
    return {
      bgImage: require('@/assets/back.png'),
      expenseType: [ '-', '+' ],
      monthName: '',
      totalBudget: 0,
      totalIncome: 0,
      totalExpense: 0,
      budgetStatus: '+',
      selectedExpenseType: '+',
      descriptionField: null,
      valueField: 0,
      incomeList: [],
      expenseList: [],
      expensePercentage: 0
    };
  },
  mounted() {
    this.computeMonth();
  },
  methods: {
    onProcessExpense() {
      if (this.selectedExpenseType === '+') {
        // income
        const incData = {
          description: this.descriptionField,
          value: this.valueField
        };

        this.incomeList.push(incData);
        this.totalIncome = Number(this.valueField) + Number(this.totalIncome);
        this.totalBudget = Number(this.valueField) + Number(this.totalBudget);
      } else {
        // expense
        const expData = {
          description: this.descriptionField,
          value: this.valueField
        };

        this.expenseList.push(expData);
        this.totalExpense = Number(this.valueField) + Number(this.totalExpense);
        this.totalBudget = Number(this.totalBudget) - Number(this.valueField);
      }

      this.expensePercentage = (100 * this.totalExpense) / this.totalIncome;
      this.descriptionField = null;
      this.valueField = null;
    },
    deleteItemIncome(item) {
      this.totalIncome = Number(this.totalIncome) - Number(item.value);
      this.totalBudget = Number(this.totalBudget) - Number(item.value);
      const index = this.incomeList.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.incomeList.splice(index, 1);
    },
    deleteItemExpense(item) {
      this.totalExpense = Number(this.totalExpense) - Number(item.value);
      this.totalBudget = Number(this.totalBudget) + Number(item.value);
      this.expensePercentage = (100 * this.totalExpense) / this.totalIncome;
      const index = this.expenseList.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.expenseList.splice(index, 1);
    },
    computeMonth() {
      const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

      const date = new Date();
      this.monthName = monthNames[date.getMonth()];
    }
  }
};
</script>
