<script setup lang="ts">
import { ref } from "vue";
import Select from "@/components/Select/Select.vue";
import type { SelectOption } from "@/components/Select";
const test = ref("");
const states = [
  "Aberdeen",
  "Armagh",
  "Bangor",
  "Bath",
  "Belfast",
  "Birmingham",
  "Bradford",
  "Brighton and Hove",
  "Bristol",
  "Cambridge",
  "Canterbury",
  "Cardiff",
  "Carlisle",
  "Chelmsford",
  "Chester",
  "Colchester",
  "Coventry",
  "Derby",
  "Derry",
  "Doncaster",
  "Dundee",
  "Durham",
  "Edinburgh",
  "Ely",
  "Exeter",
  "Glasgow",
  "Gloucester",
  "Hull",
  "Inverness",
  "Leeds",
  "Leicester",
  "Lichfield",
  "Lincoln",
  "Lisburn",
  "Liverpool",
  "London",
  "Londonderry",
  "Manchester",
  "Milton Keynes",
  "Newcastle upon Tyne",
  "Newport",
  "Newry",
  "Norwich",
  "Nottingham",
  "Oxford",
  "Perth",
  "Peterborough",
  "Plymouth",
  "Portsmouth",
  "Preston",
  "Ripon",
  "Salford",
  "Salisbury",
  "Sheffield",
  "Southampton",
  "St Albans",
  "St Davids",
  "Stirling",
  "Stoke-on-Trent",
  "Sunderland",
  "Swansea",
  "Truro",
  "Wakefield",
  "Wells",
  "Westminster",
  "Winchester",
  "Wolverhampton",
  "Worcester",
  "York",
];

const remoteFilter = (query: any): Promise<SelectOption[]> => {
  return new Promise((resolve) => {
    if (query) {
      setTimeout(() => {
        const options = states
          .filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase());
          })
          .map((label) => {
            return { label, value: label };
          });
        resolve(options);
      }, 500);
    } else {
      resolve([]);
    }
  });
};
</script>

<template>
  <Select v-model="test" placeholder="搜索远程结果" filterable remote :remoteMethod="remoteFilter">
  </Select>
</template>
