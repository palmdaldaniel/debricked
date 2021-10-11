<template>
  <div>
    <table class="table table-dark">
      <thead>
        <tr>
          <th>CVE</th>
          <th>Dependency</th>
          <th>CVSS2</th>
          <th>CVSS3</th>
        </tr>
      </thead>
      <tbody v-for="item in items" key="item.cve">
        <tr>
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
export default {
  props: ["items"],
};
</script>
<style scoped>
.table {
  margin: 0 auto;
  width: 60%;
}
</style>
