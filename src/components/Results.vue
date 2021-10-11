<template>
  <div>
    <table
      class="table table-striped"
      :class="useTheme ? 'table-dark' : 'table-light'"
    >
      <thead>
        <tr>
          <th>CVE</th>
          <th>Dependency</th>
          <th>CVSS2</th>
          <th>CVSS3</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" key="item.cve">
          <td>{{ item.cve }}</td>
          <td>{{ item.dependency }}</td>
          <td>{{ item.cvss2 }}</td>
          <td>{{ item.cvss3 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { store } from "../store/store";
export default {
  props: ["items"],
  data() {
    return {
      useTheme: store.state.useTheme,
    };
  },
};
</script>
<style scoped>
.table {
  margin: 0 auto;
}
</style>
