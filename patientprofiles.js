// async function getData() {
//   const records = await fetch("https://my.api.mockaroo.com/1.json");
//   const users = await records.json(); // Need to await for the JSON data

//   let tab = ""; // Corrected initialization
//   data.users.forEach(function (user) {
//     // Changed 'users' to 'user'
//     tab += `<tr>
//         <td>${user.firstname} </td> <!-- Changed 'users' to 'user' -->
//         <td> ${user.lastname}</td> <!-- Changed 'users' to 'user' -->
//         <td> ${user.age}</td> <!-- Changed 'users' to 'user' -->
//         <td>${user.gender} </td> <!-- Changed 'users' to 'user' -->
//         <td> ${user.MedicalCondtion}</td> <!-- Changed 'users' to 'user' -->
//         <td> ${user.Allergies}</td> <!-- Changed 'users' to 'user' -->
//         <td> ${user.Email}</td> <!-- Changed 'users' to 'user' -->



//     </tr>`;
//   });
//   document.getElementById(`tbody`).innerHTML = tab;
//   $("#userTable").DataTable({
//     // Corrected the selector
//     data: data.users,
//     columns: [
//       { data: "firstname" }, // Changed 'Firstname' to 'firstname'
//       { data: "lastname" },
//       { data: "age" },
//       { data: "gender" },
//       { data: "Medical condtions" },
//       { data: "Allergies" },
//       { data: "Email" },
//     ],
//   });
// }


async function getData() {
  const response = await fetch(
    "https://my.api.mockaroo.com/1.json?key=61444d50"
  );
  const users = await response.json(); // Assuming the API returns an array directly

  let tab = "";
  users.forEach(function (user) {
    tab += `<tr>
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td>${user.age}</td>
        <td>${user.gender}</td>
        <td>${user.MedicalCondition}</td> <!-- Corrected property name -->
        <td>${user.Allergies}</td>
        <td>${user.Email}</td>
    </tr>`;
  });
  document.getElementById("tbody").innerHTML = tab;

  // Initialize DataTables after populating the table
  $(document).ready(function () {
    $("#userTable").DataTable({
      data: users,
      columns: [
        { data: "firstname" },
        { data: "lastname" },
        { data: "age" },
        { data: "gender" },
        { data: "MedicalCondition" }, // Corrected property name
        { data: "Allergies" },
        { data: "Email" },
      ],
    });
  });
}
