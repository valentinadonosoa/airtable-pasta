var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keylCJ3F76Yq2zBoN'
});
var base = Airtable.base('appovxoPT5jSNroHb');

let lengths = [];
let widths = [];
let shapes = [];
let stuffeds = [];
let funcs = [];
let Names = []

let container = document.querySelector(".content-container");

base("Mini Collection")
  .select({
    maxRecords: 50,
    view: "Grid view",
  })
  .eachPage(
    function page(records, fetchNextPage) {
      records.forEach(function (record, index) {
        record.fields.length.forEach((length) => {

          if (!lengths.includes(length)) lengths.push(length);
        });

        record.fields.width.forEach((width) => {

          if (!widths.includes(width)) widths.push(width);
        });

        record.fields.shape.forEach((shape) => {

          if (!shapes.includes(shape)) shapes.push(shape);
        });

        record.fields.stuffed.forEach((stuffed) => {

          if (!stuffeds.includes(stuffed)) stuffeds.push(stuffed);
        });

        record.fields.function.forEach((func) => {

          if (!funcs.includes(func)) funcs.push(func);
        });

        let pastaInfo = document.querySelector("#pasta-info");
        let main = document.querySelector(".column-container");

        // shows the info
        function pastaDisplay() {
          main.style.display = "none";
          pastaInfo.style.display = "grid";
          document.querySelector("#pastaName").innerHTML = record.fields.name;
          document.querySelector("#pastaLength").innerHTML = "Length: " + record.fields.length;
          document.querySelector("#pastaWidth").innerHTML = "Width: " +  record.fields.width;
          document.querySelector("#pastaShape").innerHTML = "Shape: " + record.fields.shape;
          document.querySelector("#pastaStuffed").innerHTML = "Stuffed: " + record.fields.stuffed;
          document.querySelector("#pastaFunction").innerHTML = "Function: " + record.fields.function;
          document.querySelector("#pastaImage").src = record.fields.pictures[0].url;
        }
        // shows the grid
        function pastaDisplay2() {
          main.style.display = "grid";
          pastaInfo.style.display = "none";
        }

        document.querySelector("#close").addEventListener('click', pastaDisplay2);

        let airtableItem = document.createElement("div");
        airtableItem.classList.add("airtable-item");
        airtableItem.addEventListener('click', pastaDisplay);

        airtableItem.setAttribute("data-length", record.fields.length);
        airtableItem.setAttribute("data-width", record.fields.width);
        airtableItem.setAttribute("data-shape", record.fields.shape);
        airtableItem.setAttribute("data-stuffed", record.fields.stuffed);
        airtableItem.setAttribute("data-func", record.fields.function);

        let drawerContent = document.createElement("div");

        drawerContent.classList.add("drawer-content");


        let drawerContentImageTable = document.createElement("div");

        drawerContentImageTable.classList.add("drawer-content--imageTable");

        drawerContent.append(drawerContentImageTable);

        let drawerContentImage = document.createElement("img");

        drawerContentImage.classList.add("drawer-content--image");

        drawerContentImage.src = record.fields.pictures[0].url;

        drawerContentImageTable.append(drawerContentImage);

        airtableItem.append(drawerContent);

        container.append(airtableItem);

      });


      fetchNextPage();
    },

    function done(err) {
      if (err) {
        console.error(err);
        return;
      } else {

        let allItems = Array.from(document.querySelectorAll(".airtable-item"));

        function filterItems(type, tag) {
          let filteredItems;

          if (tag == "all") {
            filteredItems = allItems;
          } else if (type == "length") {
            filteredItems = allItems.filter((item) =>
              item.dataset.length.includes(tag.dataset.filter)
            ); 
          }else if (type == "width") {
            filteredItems = allItems.filter((item) =>
              item.dataset.width.includes(tag.dataset.filter)
            ); 
          }else if (type == "shape") {
            filteredItems = allItems.filter((item) =>
              item.dataset.shape.includes(tag.dataset.filter)
            ); 
          }else if (type == "stuffed") {
            filteredItems = allItems.filter((item) =>
              item.dataset.stuffed.includes(tag.dataset.filter)
            ); 
          }else if (type == "func") {
            filteredItems = allItems.filter((item) =>
              item.dataset.func.includes(tag.dataset.filter)
            ); 
          }

          container.innerHTML = "";

          console.log('filteredItems', filteredItems);

          filteredItems.forEach((item) => {
            container.append(item);
          });
        }

        lengths.forEach((length) => {
          let lengths = document.querySelector(".lengths")
          
          let filterBtn = document.createElement("button");

          filterBtn.classList.add("filter-btn");

          filterBtn.setAttribute("data-filter", length);

          filterBtn.innerHTML = length;

          document.querySelector(".lengths").append(filterBtn);

          filterBtn.addEventListener("click", (e) => {

            document
              .querySelectorAll(".filter-btn")
              .forEach((btn) => btn.classList.remove("is-active"));

              e.target.classList.add("is-active");

            filterItems("length", e.target);
          });
        });
      }

      widths.forEach((width) => {
        let widths = document.querySelector(".widths")
        
        let filterBtn = document.createElement("button");

        filterBtn.classList.add("filter-btn");

        filterBtn.setAttribute("data-filter", width);

        filterBtn.innerHTML = width;

        document.querySelector(".widths").append(filterBtn);

        filterBtn.addEventListener("click", (e) => {

          document
            .querySelectorAll(".filter-btn")
            .forEach((btn) => btn.classList.remove("is-active"));

            e.target.classList.add("is-active");
 
          filterItems("width", e.target);
        });
      });

// 
// 
// 
        shapes.forEach((shape) => {
          let shapes = document.querySelector(".shapes")
          
          let filterBtn = document.createElement("button");

          filterBtn.classList.add("filter-btn");

          filterBtn.setAttribute("data-filter", shape);

          filterBtn.innerHTML = shape;

          document.querySelector(".shapes").append(filterBtn);

          filterBtn.addEventListener("click", (e) => {

            document
              .querySelectorAll(".filter-btn")
              .forEach((btn) => btn.classList.remove("is-active"));

              e.target.classList.add("is-active");

            filterItems("shape", e.target);
          });
        });



          stuffeds.forEach((stuffed) => {
            let stuffeds = document.querySelector(".stuffeds")

            let filterBtn = document.createElement("button");

            filterBtn.classList.add("filter-btn");

            filterBtn.setAttribute("data-filter", stuffed);

            filterBtn.innerHTML = stuffed;

            document.querySelector(".stuffeds").append(filterBtn);

            filterBtn.addEventListener("click", (e) => {

              document
                .querySelectorAll(".filter-btn")
                .forEach((btn) => btn.classList.remove("is-active"));

              e.target.classList.add("is-active");

              filterItems("stuffed", e.target);
            });
          });

            funcs.forEach((func) => {
              let funcs = document.querySelector(".stuffeds")

              let filterBtn = document.createElement("button");

              filterBtn.classList.add("filter-btn");

              filterBtn.setAttribute("data-filter", func);

              filterBtn.innerHTML = func;

              document.querySelector(".funcs").append(filterBtn);
      

              filterBtn.addEventListener("click", (e) => {

                document
                  .querySelectorAll(".filter-btn")
                  .forEach((btn) => btn.classList.remove("is-active"));

                  e.target.classList.add("is-active");

                filterItems("func", e.target);
              });
            });
      
    }

    
  );



// document.querySelectorAll("airtable-item").forEach(function(item) {
//   item.addEventListener('click', function() {
//     console.log("for loop running");
//     pastaItems[i].addEventListener('click', pastaDisplay);
//   })
// })

// pastaItems.addEventListener("click", function() {
//   main.style.display = "none";
//   pastaInfo.style.display = "block";
// });