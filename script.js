let phone;
let pinValue;
let id;
let prod_id;
// Active link highlight (event delegation: works for elements added after login)
document.addEventListener("click", (e) => {
  const link = e.target.closest(".sidebar__menu .sidebar-link");
  if (!link) return;
  e.preventDefault();
  document
    .querySelectorAll(".sidebar__menu .sidebar-link")
    .forEach((l) => l.classList.remove("is-active"));
  link.classList.add("is-active");
});
function pin() {
  const phoneslot = document.getElementById("phone").value;
  phone = phoneslot;

  document.getElementById("cbody").innerHTML = `
    <center>
    <br>
      <h2><strong>ENTER PIN</strong></h2><br>
      <br>

      <input
        type="password"
        class="form-control calc-btn"
        id="pin"
        style="text-align:center;"
        placeholder=""
        aria-label="pin"
        required
      >

      <p id="error" style="margin-top: 10px;"></p>

      <button class="calc-btn btn btn-success" onclick="Login()">
        Confirm
      </button>
    </center>
    <br>
  `;
}

async function Login() {
  try {
    pinValue = document.getElementById("pin").value;

    const res = await fetch(
      `https://abrvlqymzaqpmgfktwfr.supabase.co/rest/v1/fayda-identy-test?apikey=sb_publishable_6YWtr3aPR8V43iInTNwnCw_jEfYrInS&phone=eq.${encodeURIComponent(phone)}&password=eq.${encodeURIComponent(pinValue)}`,
    );

    const data = await res.json();

    // FIX: check for empty/invalid result BEFORE using data[0]
    if (!Array.isArray(data) || data.length === 0) {
      document.getElementById("error").innerHTML =
        "Incorrect Phone Number or PIN.";
      return;
    }

    // FIX: assign the global id (before, `let id` created a new local variable)
    id = data[0].id;

    const res2 = await fetch(
      `https://abrvlqymzaqpmgfktwfr.supabase.co/rest/v1/recipts?apikey=sb_publishable_6YWtr3aPR8V43iInTNwnCw_jEfYrInS&buy_by=eq.${id}`,
    );

    const data2 = await res2.json();
    const recipt_ammount = data2.length;
    document.getElementById("body").innerHTML = `
    <div class="app-layout">
      <nav class="sidebar" id="app-sidebar">
        <div class="sidebar__header">
          <a href="#" class="sidebar__brand"> </a>
        </div>
        <ul class="sidebar__menu">
          <li>
            <a href="#"  onclick="Dashboard(); return false;"class="sidebar-link is-active"
              ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill sidebar-link__icon" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
</svg><span class="sidebar-link__text">Dashboard</span></a
            >
          </li>
          <li>
            <a href="#" class="sidebar-link" onclick="SendMoney(); return false;"
              ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill sidebar-link__icon" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
</svg><span class="sidebar-link__text">Send Money</span></a
            >
          </li>
          <li>
            <a href="#" class="sidebar-link" onclick="receipts(); return false;"
              ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-receipt sidebar-link__icon" viewBox="0 0 16 16">
  <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z"/>
  <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5"/>
</svg><span class="sidebar-link__text">Receipts</span></a
            >
          </li>
          <li>
            <a href="#" class="sidebar-link" onclick="products(); return false;"
              ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-dash sidebar-link__icon" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/>
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
</svg>
              <span class="sidebar-link__text">Products</span></a
            >
          </li>
        </ul>
        <div class="sidebar__footer">
           <li>
            <a href="#" class="sidebar-link" onclick="identity(); return false;"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-bounding-box sidebar-link__icon" viewBox="0 0 16 16">
  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
</svg>
              <span class="sidebar-link__text">Identity</span></a
            >
          </li>
        </div>
      </nav>
      <div class="page-content-wrapper">
        <header class="mobile-header">
          <button
            id="mobile-menu-open-btn"
            aria-label="Open menu"
            aria-controls="app-sidebar"
            aria-expanded="false"
            class="btn"
          >
            &#x2630;
          </button>
          <a href="#" class="sidebar__brand"><img src="assets/logos/image.png" alt=""  style="
                  width: 100px;
                  height: 30px;
                "></a>
        </header>
        <main class="main-content" id="content">
          <br>
          <h1><strong>Welcome, ${data[0].first_name}👋</strong></h1>
          <p>${data[0].first_name}, you have the balance of ${data[0].ammount} ETB.</p>

<br>
<center>
          <div class="card text-white" style="height: 9rem; margin-right: 40px; border-radius: 100px;" >
  <!-- The background image -->
  <img src="assets/tests/image copy.png" class="card-img" alt="Background Image" height="149rem">
  <div class="card-body card-img-overlay d-flex flex-column justify-content-center" style="margin-left: 30px; margin-top: 10px;">
    <h1><strong>${data[0].ammount} ETB</strong></h1>
    <p style="color: white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
  <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
</svg>   Available Balance</p>
  </div>
</div>
</center>
</br>
<br>
        </main>
    </div>
    `;
    document.getElementById("mod").innerText =
      `${data[0].first_name}'s Portal - ሳንቲም መስመር | ገንዘብ መላክ ፣ ማስቀመጥ እና መቀበል ቀላል ነው።`;
    console.log(data);

    // FIX: the sidebar only exists now, so attach its listeners now
    setupSidebar();
  } catch {
    const err = document.getElementById("error");
    if (err) err.innerHTML = "Something is wrong please, try again later!";
  }
}

async function products() {
  try {
    const res = await fetch(
      `https://abrvlqymzaqpmgfktwfr.supabase.co/rest/v1/products?apikey=sb_publishable_6YWtr3aPR8V43iInTNwnCw_jEfYrInS&prod_by=eq.${id}`,
    );
    const data = await res.json();

    document.getElementById("content").innerHTML = `
      <div style="text-align: right;">
        <button class="add-product" onclick="addProductForm()">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-lg the-big-one" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
          </svg>
        </button>
      </div>
      <h2><strong>Your products</strong></h2>
      <br><br>
      <div id="prods" class="flex"></div>
    `;

    if (!Array.isArray(data) || data.length === 0) {
      document.getElementById("prods").innerHTML = "<p>No products yet.</p>";
      return;
    }

    let prod_html = ``;
    data.forEach((prod) => {
      prod_html += `
        <div class="card product-card" data-id="${prod.id}" style="width: 14rem; height: 21rem; cursor: pointer;">
          <img src="${esc(prod.prod_img)}" class="card-img-top" alt="" width="100px">
          <div class="card-body">
            <h5><strong>${esc(prod.prod_name)}</strong></h5>
            <p class="card-text"><strong>Price</strong> : ${prod.prod_price} ETB</p>
          </div>
        </div>
      `;
    });
    document.getElementById("prods").innerHTML = prod_html;

    document.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", () => {
        prod_id = card.dataset.id;
        const selected = data.find((p) => String(p.id) === String(prod_id));
        viewproductqrcode(selected);
      });
    });
  } catch (e) {
    console.error(e);
  }
}

function viewproductqrcode(prod) {
  const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(prod.id)}&size=200`;

  document.getElementById("content").innerHTML = `
    <br>
    <button class="btn" onclick="products()">&larr; Back</button>
    <br>
    <br><br>
    <center>
      <h2><strong>${esc(prod.prod_name)}</strong></h2>
      <p>${prod.prod_price} ETB</p>
      <img id="prod-qr" src="${qrUrl}" alt="QR code for ${esc(prod.prod_name)}" width="200" height="200">
    </center>
  `;
}
async function receipts() {
  try {
    const res = await fetch(
      `https://abrvlqymzaqpmgfktwfr.supabase.co/rest/v1/recipts?apikey=sb_publishable_6YWtr3aPR8V43iInTNwnCw_jEfYrInS&buy_by=eq.${id}`,
    );

    const data = await res.json();
    document.getElementById("content").innerHTML = `   
    <br><h1><strong>Your Receipts</strong></h1>       <br><div id="recipts"></div>
`;
    let rhtml = ``;

    data.forEach((recipt) => {
      rhtml += `<center>

          <div
            class="card"
            style="
              margin-left: 20px;
              margin-right: 20px;
              text-align: left;
              margin-bottom: 10px;
              box-shadow:
                0 4px 8px
                rgba(0, 0, 0, 0.1);
            "
          >

            <div class="card-body">

              <div class="flex">

                <div>

                  <h4
                    class="btn btn-info"
                    style="
                      margin-top: 5px;
                      width: 52px;
                      height: 52px;
                      font-size: 24px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: #5899E2;
                      background-color: #E8F3FF;
                      border-color: #65AFFF;
                      cursor: auto;
                      margin-right: 10px;
                    "
                  >

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-receipt" viewBox="0 0 16 16">
  <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z"/>
  <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5"/>
</svg>

                  </h4>

                </div>

                <div
                  style="margin-top: 5px;"
                >

                  <h5
                    class="card-title"
                  >

                    <strong>
                      ${esc(recipt.prod_name || "Prescription")}

                      •
                    </strong>

                    ${recipt.price || "No time set"}

                  </h5>

                  <h6
                    class="card-text"
                  >
                    Bought By You
                  </h6>

                </div>

              </div>

            </div>

          </div>

        </center>`;
    });
    document.getElementById("recipts").innerHTML = rhtml;
  } catch {}
}
async function Dashboard() {
  try {
    const res = await fetch(
      `https://abrvlqymzaqpmgfktwfr.supabase.co/rest/v1/fayda-identy-test?apikey=sb_publishable_6YWtr3aPR8V43iInTNwnCw_jEfYrInS&id=eq.${id}`,
    );

    const data = await res.json();

    // FIX: check for empty/invalid result BEFORE using data[0]
    if (!Array.isArray(data) || data.length === 0) {
      document.getElementById("error").innerHTML =
        "Incorrect Phone Number or PIN.";
      return;
    }

    // FIX: assign the global id (before, `let id` created a new local variable)

    document.getElementById("content").innerHTML = `
          <br>
          <h1><strong>Welcome, ${data[0].first_name}👋</strong></h1>
          <p>${data[0].first_name}, you have the balance of ${data[0].ammount} ETB.</p>

<br>
<center>
          <div class="card text-white" style="height: 9rem; margin-right: 40px; border-radius: 100px;" >
  <!-- The background image -->
  <img src="assets/tests/image copy.png" class="card-img" alt="Background Image" height="149rem">
  <div class="card-body card-img-overlay d-flex flex-column justify-content-center" style="margin-left: 30px; margin-top: 10px;">
    <h1><strong>${data[0].ammount} ETB</strong></h1>
    <p style="color: white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
  <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
</svg>   Available Balance</p>
  </div>
</div>
</center>
</br>
<br>
    `;
    document.getElementById("mod").innerText =
      `${data[0].first_name}'s Portal - ሳንቲም መስመር | ገንዘብ መላክ ፣ ማስቀመጥ እና መቀበል ቀላል ነው።`;
    console.log(data);

    // FIX: the sidebar only exists now, so attach its listeners now
    setupSidebar();
  } catch {
    const err = document.getElementById("error");
    if (err) err.innerHTML = "Incorrect Phone Number or PIN.";
  }
}

async function identity() {
  if (!id) {
    return;
  }

  const main = document.getElementById("content");

  if (!main) {
    return;
  }

  const faydaParams = new URLSearchParams({
    apikey: "sb_publishable_6YWtr3aPR8V43iInTNwnCw_jEfYrInS",
    id: `eq.${id}`,
  });

  try {
    const res = await fetch(
      `https://abrvlqymzaqpmgfktwfr.supabase.co/rest/v1/fayda-identy-test?${faydaParams}`,
    );

    if (!res.ok) {
      throw new Error("Unable to load Fayda information.");
    }

    const data = await res.json();

    const account = Array.isArray(data) ? data[0] : data.value?.[0];

    if (!account) {
      main.innerHTML = `
        <br>

        <h1>
          <strong>
          </strong>
        </h1>

        <br>

        <div class="card">

          <div class="card-body">

            <p>
              Unable to find your Fayda information.
            </p>

          </div>

        </div>
      `;

      return;
    }

    main.innerHTML = `
      <br>

      <h1>
        <strong>
          My Identity
        </strong>
      </h1>

      <br>
      <br>
      <br>

      <center>
        <img
        class="rounded mx-auto d-block"
        src="${account.img || "assets/icons/logo_only_v1.png"}"
        alt="Fayda profile"
        width="90"
        style="border-radius: 50%;"
      />
      <br>
        <h2>
          <strong>
            ${account.first_name || ""}
            ${account.last_name || ""}
          </strong>
        </h2>

      </center>

      <center>
<p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
</svg> Verified identity</p>
      </center>

      <br>
      <br>

      <center>

        <div class="dashboard-cards">

          <div class="card">

            <div class="card-body">

              <h1>
                <strong>
                  ${account.first_name || ""}
                </strong>
              </h1>

              <p>
                First Name
              </p>

            </div>

          </div>

          <div class="card">

            <div class="card-body">

              <h1>
                <strong>
                  ${account.sex || "Not available"}
                </strong>
              </h1>

              <p>
                Sex
              </p>

            </div>

          </div>

          <div class="card">

            <div class="card-body">

              <h1>
                <strong>
                  ${account.nationality || "Not available"}
                </strong>
              </h1>

              <p>
                Nationality
              </p>

            </div>

          </div>

          <div class="card">

            <div class="card-body">

              <h1>
                <strong>
                  ${account.birth || "Not available"}
                </strong>
              </h1>

              <p>
                Date of Birth
              </p>

            </div>

          </div>

          <div class="card">

            <div class="card-body">

              <h1>
                <strong>
                  ${account.phone || "Not available"}
                </strong>
              </h1>

              <p>
                Phone
              </p>

            </div>

          </div>

          <div class="card">

            <div class="card-body">

              <h1>
                <strong>
                  ${account.addr || "Not available"}
                </strong>
              </h1>

              <p>
                Address
              </p>

            </div>

          </div>

        </div>

      </center>
    `;
  } catch (error) {
    console.error("My Fayda failed:", error);

    main.innerHTML = `
      <br>

      <h1>
        <strong>
          My Identity
        </strong>
      </h1>

      <br>

      <div class="card">

        <div class="card-body">

          <p>
            Unable to load your Identity right now.
          </p>

        </div>

      </div>
    `;
  }
}

/* =====================================================================
   ADD A PRODUCT  -  the + button on the Products page
   The database creates the product's ID; the QR code is made from it.
   ===================================================================== */
// Shown when no photo is picked
const PROD_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">' +
      '<rect width="400" height="400" fill="#E8F3FF"/>' +
      '<g fill="none" stroke="#5899E2" stroke-width="12" stroke-linejoin="round" stroke-linecap="round">' +
      '<path d="M120 170l80-40 80 40v90l-80 40-80-40z"/><path d="M120 170l80 40 80-40M200 210v90"/></g></svg>',
  );

// Shrink the chosen photo so it can be stored directly in prod_img
function prodImageToDataUrl(file, max = 400) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("That image couldn't be read."));
    };
    img.src = url;
  });
}

function addProductForm() {
  document.getElementById("content").innerHTML = `
    <br>
    <button class="btn" onclick="products()">&larr; Back</button>
    <br><br>
    <center>
      <div class="card fade-in" style="max-width:25rem; border-radius:30px; text-align:left;">
        <div class="card-body p-4">
          <h2 class="text-center"><strong>Add a product</strong></h2>
          <br>
          <label class="form-label" for="prod-name">Product name</label>
          <input type="text" class="form-control mb-3" id="prod-name" maxlength="60" autocomplete="off">
          <label class="form-label" for="prod-price">Price (ETB)</label>
          <input type="number" inputmode="decimal" min="1" step="0.01" class="form-control mb-3" id="prod-price">
          <label class="form-label" for="prod-photo">Photo (optional)</label>
          <input type="file" accept="image/*" class="form-control mb-3" id="prod-photo">
          <p id="prod-error" style="color:#ff2424; min-height:1.5rem;"></p>
          <button id="prod-save" class="btn btn-success w-100" onclick="saveProduct()">Create product</button>
        </div>
      </div>
    </center>
  `;
}

async function saveProduct() {
  const err = document.getElementById("prod-error");
  const btn = document.getElementById("prod-save");
  err.textContent = "";

  const name = document.getElementById("prod-name").value.trim();
  const price = round2(document.getElementById("prod-price").value);
  const photo = document.getElementById("prod-photo").files[0];

  if (!name) {
    err.textContent = "Enter a product name.";
    return;
  }
  if (!(price > 0)) {
    err.textContent = "Enter a price greater than 0.";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Creating...";
  try {
    const prod_img = photo ? await prodImageToDataUrl(photo) : PROD_PLACEHOLDER;
    const created = await sbInsert("products", {
      prod_name: name,
      prod_price: price,
      prod_img,
      prod_by: id,
    });
    // Show the new product's QR code right away
    viewproductqrcode(created);
  } catch (e) {
    err.textContent = e.message;
    btn.disabled = false;
    btn.textContent = "Create product";
  }
}

/* =====================================================================
   PAYMENTS  -  pay a person (phone number) or a product (QR code / ID)
   ===================================================================== */
const SB_URL = "https://abrvlqymzaqpmgfktwfr.supabase.co/rest/v1";
const SB_KEY = "sb_publishable_6YWtr3aPR8V43iInTNwnCw_jEfYrInS";
const SB_HEADERS = { apikey: SB_KEY, "Content-Type": "application/json" };

let pendingPayment = null; // the payment waiting for the user's PIN
let scanStream = null; // camera stream while scanning a QR code
let scanTimer = null;

// Stop the camera if the user navigates away using the sidebar
document.addEventListener("click", (e) => {
  if (e.target.closest(".sidebar-link")) payStopScan();
});

/* ---------- helpers ---------- */
function esc(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
const round2 = (n) => Math.round(Number(n) * 100) / 100;
const money = (n) =>
  round2(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

async function sbSelect(table, filters) {
  const res = await fetch(`${SB_URL}/${table}?${new URLSearchParams(filters)}`, {
    headers: SB_HEADERS,
  });
  if (!res.ok) {
    const error = new Error("Could not reach the server. Please try again.");
    error.status = res.status;
    throw error;
  }
  return res.json();
}

async function sbUpdate(table, filters, body) {
  const res = await fetch(`${SB_URL}/${table}?${new URLSearchParams(filters)}`, {
    method: "PATCH",
    headers: { ...SB_HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  const rows = res.ok ? await res.json() : [];
  // An empty result means the database refused the write (e.g. RLS policy)
  if (!res.ok || rows.length === 0) throw new Error("Update was not saved.");
  return rows[0];
}

async function sbInsert(table, body) {
  const res = await fetch(`${SB_URL}/${table}`, {
    method: "POST",
    headers: { ...SB_HEADERS, Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  const rows = res.ok ? await res.json() : [];
  if (!res.ok || rows.length === 0) throw new Error("Insert was not saved.");
  return rows[0];
}

/* ---------- icons (same look as the Receipts page tiles) ---------- */
// Light-blue icon tile, copied from the Receipts page
const PAY_TILE =
  "width:52px; height:52px; flex:0 0 52px; display:flex; align-items:center; justify-content:center; border-radius:.375rem; color:#5899E2; background-color:#E8F3FF; border:1px solid #65AFFF;";
// Green version for the success screen
const PAY_TILE_OK =
  "width:52px; height:52px; flex:0 0 52px; display:flex; align-items:center; justify-content:center; border-radius:.375rem; color:#198754; background-color:#E8F8EE; border:1px solid #75B798;";

function payIcon(name, size = 24) {
  const paths = {
    person:
      '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    qr:
      '<path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4"/>' +
      '<rect x="8" y="8" width="3" height="3"/><rect x="13" y="8" width="3" height="3"/>' +
      '<rect x="8" y="13" width="3" height="3"/><path d="M14 14h2v2h-2z"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}

// One clickable row, styled like a card on the Receipts page
function payOption(onclick, icon, title, desc) {
  return `
    <center>
      <div class="card" onclick="${onclick}"
        style="margin-left:20px; margin-right:20px; text-align:left; margin-bottom:10px; cursor:pointer; box-shadow:0 4px 8px rgba(0, 0, 0, 0.1);">
        <div class="card-body">
          <div class="flex" style="align-items:center;">
            <div style="${PAY_TILE} margin-right:10px;">${payIcon(icon)}</div>
            <div style="flex:1;">
              <h5 class="card-title"><strong>${title}</strong></h5>
              <h6 class="card-text">${desc}</h6>
            </div>
            <div style="color:#6b7280;">${payIcon("chevron", 20)}</div>
          </div>
        </div>
      </div>
    </center>`;
}

/* ---------- step 1: choose what to pay for ---------- */
function SendMoney() {
  payStopScan();
  pendingPayment = null;
  document.getElementById("content").innerHTML = `
    <br>
    <h1><strong>Send Money</strong></h1>
    <p>Choose what you want to pay for.</p>
    <br>
    ${payOption("payPersonForm()", "person", "Pay a person", "Send money using their phone number")}
    ${payOption("payProductForm()", "qr", "Pay for a product", "Scan the product's QR code")}
  `;
}

/* ---------- pay a person ---------- */
function payPersonForm() {
  payStopScan();
  document.getElementById("content").innerHTML = `
    <br>
    <button class="btn" onclick="SendMoney()">&larr; Back</button>
    <br><br>
    <center>
      <div class="card fade-in" style="max-width:25rem; border-radius:30px; text-align:left;">
        <div class="card-body p-4">
          <h2 class="text-center"><strong>Pay a person</strong></h2>
          <br>
          <label class="form-label" for="pay-phone">Recipient's phone number</label>
          <div class="input-group mb-3">
            <span class="input-group-text" style="color:#274060;">+ 251</span>
            <input type="tel" inputmode="numeric" class="form-control" id="pay-phone" autocomplete="off">
          </div>
          <label class="form-label" for="pay-amount">Amount (ETB)</label>
          <input type="number" inputmode="decimal" min="1" step="0.01" class="form-control mb-3" id="pay-amount">
          <p id="pay-error" style="color:#ff2424; min-height:1.5rem;"></p>
          <button id="pay-next" class="btn btn-success w-100" onclick="payPersonLookup()">Continue</button>
        </div>
      </div>
    </center>
  `;
}

async function payPersonLookup() {
  const err = document.getElementById("pay-error");
  const btn = document.getElementById("pay-next");
  err.textContent = "";

  // Keep only the 9 digits after +251 (accepts 0911..., 911..., +251911...)
  const national = document
    .getElementById("pay-phone")
    .value.replace(/\D/g, "")
    .replace(/^(251|0)/, "");
  const amount = round2(document.getElementById("pay-amount").value);

  if (national.length !== 9) {
    err.textContent = "Enter a valid phone number (9 digits after +251).";
    return;
  }
  if (!(amount > 0)) {
    err.textContent = "Enter an amount greater than 0.";
    return;
  }

  btn.disabled = true;
  try {
    // The stored phone format may vary, so match the common variants
    const rows = await sbSelect("fayda-identy-test", {
      select: "id,first_name,last_name,phone",
      or: `(phone.eq.${national},phone.eq.0${national},phone.eq.251${national},phone.eq.+251${national})`,
    });

    if (rows.length === 0) {
      err.textContent = "No account found with that phone number.";
    } else if (String(rows[0].id) === String(id)) {
      err.textContent = "You can't pay yourself.";
    } else {
      const name =
        `${rows[0].first_name || ""} ${rows[0].last_name || ""}`.trim() ||
        "Account holder";
      pendingPayment = {
        type: "person",
        toId: rows[0].id,
        headline: name,
        subline: `+251 ${national}`,
        amount,
        receiptName: `Sent to ${name}`,
      };
      payConfirmScreen();
      return;
    }
  } catch (e) {
    err.textContent = e.message;
  }
  btn.disabled = false;
}

/* ---------- pay a product (QR scan only) ---------- */
function payProductForm() {
  payStopScan();
  document.getElementById("content").innerHTML = `
    <br>
    <button class="btn" onclick="SendMoney()">&larr; Back</button>
    <br><br>
    <center>
      <div class="card fade-in" style="max-width:25rem; border-radius:30px;">
        <div class="card-body p-4">
          <h2><strong>Scan to pay</strong></h2>
          <p>Point your camera at the product's QR code.</p>
          <div id="scan-area"></div>
          <p id="pay-error" style="color:#ff2424; min-height:1.5rem;"></p>
          <button id="pay-rescan" class="btn btn-success w-100" style="display:none;" onclick="payScanQR()">Scan again</button>
        </div>
      </div>
    </center>
  `;
  payScanQR();
}

// Fallback QR reader for browsers without BarcodeDetector (loaded only when needed)
function loadJsQR() {
  if (window.jsQR) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js";
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function payScanQR() {
  const err = document.getElementById("pay-error");
  const area = document.getElementById("scan-area");
  const rescan = document.getElementById("pay-rescan");
  if (!err || !area) return;
  err.textContent = "";
  rescan.style.display = "none";

  if (!navigator.mediaDevices?.getUserMedia) {
    err.textContent =
      "The camera isn't available. Open the app over HTTPS and try again.";
    return;
  }

  try {
    scanStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    area.innerHTML = `<video id="scan-video" autoplay playsinline muted
      style="width:100%; border-radius:20px; margin-bottom:10px;"></video>`;
    const video = document.getElementById("scan-video");
    video.srcObject = scanStream;

    let read;
    if ("BarcodeDetector" in window) {
      const detector = new BarcodeDetector({ formats: ["qr_code"] });
      read = async () => {
        const codes = await detector.detect(video);
        return codes.length ? codes[0].rawValue : null;
      };
    } else {
      await loadJsQR();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      read = async () => {
        if (!video.videoWidth) return null;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(img.data, img.width, img.height);
        return code ? code.data : null;
      };
    }

    let busy = false;
    scanTimer = setInterval(async () => {
      if (busy) return;
      busy = true;
      try {
        const value = await read();
        if (value) {
          payStopScan();
          payProductLookup(value);
        }
      } catch {}
      busy = false;
    }, 300);
  } catch {
    payStopScan();
    err.textContent =
      "Couldn't open the camera. Allow camera access and try again.";
    rescan.style.display = "block";
  }
}

async function payProductLookup(scanned) {
  const err = document.getElementById("pay-error");
  const rescan = document.getElementById("pay-rescan");
  const fail = (msg) => {
    err.textContent = msg;
    rescan.style.display = "block";
  };

  const productId = String(scanned).trim();
  try {
    const rows = await sbSelect("products", {
      id: `eq.${productId}`,
      select: "id,prod_name,prod_price,prod_img,prod_by",
    });

    if (rows.length === 0) return fail("This QR code isn't a valid product.");
    const prod = rows[0];
    if (String(prod.prod_by) === String(id))
      return fail("This is your own product.");

    const sellers = await sbSelect("fayda-identy-test", {
      id: `eq.${prod.prod_by}`,
      select: "first_name,last_name",
    });
    const seller = sellers[0]
      ? `${sellers[0].first_name || ""} ${sellers[0].last_name || ""}`.trim()
      : "";
    pendingPayment = {
      type: "product",
      toId: prod.prod_by,
      headline: prod.prod_name,
      subline: seller ? `Sold by ${seller}` : "",
      img: prod.prod_img,
      amount: round2(prod.prod_price),
      receiptName: prod.prod_name,
    };
    payConfirmScreen();
  } catch (e) {
    // A malformed ID makes the database answer 400: not one of our QR codes
    fail(e.status === 400 ? "This QR code isn't a valid product." : e.message);
  }
}

function payStopScan() {
  clearInterval(scanTimer);
  scanTimer = null;
  if (scanStream) {
    scanStream.getTracks().forEach((t) => t.stop());
    scanStream = null;
  }
  const area = document.getElementById("scan-area");
  if (area) area.innerHTML = "";
}

/* ---------- confirm with PIN ---------- */
function payConfirmScreen() {
  const p = pendingPayment;
  const back = p.type === "person" ? "payPersonForm()" : "payProductForm()";

  document.getElementById("content").innerHTML = `
    <br>
    <button class="btn" onclick="${back}">&larr; Back</button>
    <br><br>
    <center>
      <div class="card fade-in" style="max-width:25rem; border-radius:30px;">
        <div class="card-body p-4">
          <h2><strong>Confirm payment</strong></h2>
          <br>
          ${
            p.img
              ? `<img src="${esc(p.img)}" alt="" style="width:120px; height:120px; object-fit:cover; border-radius:20px;"><br><br>`
              : ""
          }
          <h4><strong>${esc(p.headline)}</strong></h4>
          <p>${esc(p.subline)}</p>
          <h1><strong>${money(p.amount)} ETB</strong></h1>
          <br>
          <input type="password" inputmode="numeric" class="form-control mb-2"
            id="pay-pin" placeholder="Enter your PIN" style="text-align:center;">
          <p id="pay-error" style="color:#ff2424; min-height:1.5rem;"></p>
          <button id="pay-btn" class="btn btn-success w-100" onclick="payExecute()">Pay ${money(p.amount)} ETB</button>
        </div>
      </div>
    </center>
  `;
}

async function payExecute() {
  const p = pendingPayment;
  const err = document.getElementById("pay-error");
  const btn = document.getElementById("pay-btn");
  err.textContent = "";

  if (document.getElementById("pay-pin").value !== pinValue) {
    err.textContent = "Incorrect PIN.";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Processing...";
  try {
    const result = await executeTransfer(p);
    paySuccessScreen(p, result);
  } catch (e) {
    err.textContent = e.message;
    btn.disabled = false;
    btn.textContent = `Pay ${money(p.amount)} ETB`;
  }
}

/* ---------- move the money ---------- */
async function executeTransfer(p) {
  const TABLE = "fayda-identy-test";

  // Always use fresh balances from the database, not what's on screen
  const [sender] = await sbSelect(TABLE, { id: `eq.${id}`, select: "id,ammount" });
  const [receiver] = await sbSelect(TABLE, { id: `eq.${p.toId}`, select: "id,ammount" });
  if (!sender || !receiver) throw new Error("Account not found.");

  const senderBalance = Number(sender.ammount);
  const receiverBalance = Number(receiver.ammount);
  if (senderBalance < p.amount) {
    throw new Error(`Insufficient balance. You have ${money(senderBalance)} ETB.`);
  }

  const newBalance = round2(senderBalance - p.amount);
  try {
    await sbUpdate(TABLE, { id: `eq.${id}` }, { ammount: newBalance });
  } catch {
    throw new Error("The payment couldn't be completed. No money was taken.");
  }

  try {
    await sbUpdate(
      TABLE,
      { id: `eq.${p.toId}` },
      { ammount: round2(receiverBalance + p.amount) },
    );
  } catch {
    // Crediting failed: give the money back to the sender
    try {
      await sbUpdate(TABLE, { id: `eq.${id}` }, { ammount: senderBalance });
      throw new Error("The payment couldn't be completed. No money was taken.");
    } catch (e) {
      if (e.message.startsWith("The payment")) throw e;
      throw new Error(
        "The payment failed and your balance may be wrong. Please contact support.",
      );
    }
  }

  // Save the receipt (the payment already went through, so don't fail on this)
  let receiptSaved = true;
  try {
    await sbInsert("recipts", {
      buy_by: id,
      prod_name: p.receiptName,
      price: p.amount,
    });
  } catch {
    receiptSaved = false;
  }

  return { newBalance, receiptSaved };
}

/* ---------- done ---------- */
function paySuccessScreen(p, result) {
  pendingPayment = null;
  document.getElementById("content").innerHTML = `
    <br><br>
    <center>
      <div class="card fade-in" style="max-width:25rem; border-radius:30px;">
        <div class="card-body p-4">
          <div style="${PAY_TILE_OK} margin:0 auto 1rem;">${payIcon("check")}</div>
          <h2><strong>Payment sent</strong></h2>
          <br>
          <h1><strong>${money(p.amount)} ETB</strong></h1>
          <p>paid to <strong>${esc(p.headline)}</strong></p>
          <p>New balance: ${money(result.newBalance)} ETB</p>
          ${
            result.receiptSaved
              ? ""
              : `<p style="color:#b45309;">Your payment went through, but the receipt couldn't be saved.</p>`
          }
          <br>
          <button class="btn btn-success w-100 mb-2" onclick="Dashboard()">Done</button>
          <button class="btn btn-outline-primary w-100" onclick="receipts()">View receipts</button>
        </div>
      </div>
    </center>
  `;
}

// FIX: merged into one function that runs after login
// (the old DOMContentLoaded code ran before the sidebar existed, and
// setupSidebarListeners() was never defined)
function setupSidebar() {
  const sidebar = document.getElementById("app-sidebar");
  const collapseBtn = document.getElementById("sidebar-collapse-btn");
  const mobileOpenBtn = document.getElementById("mobile-menu-open-btn");
  const isCollapsedKey = "sidebarIsCollapsed";

  if (collapseBtn && sidebar) {
    if (localStorage.getItem(isCollapsedKey) === "true")
      sidebar.classList.add("is-collapsed");
    collapseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sidebar.classList.toggle("is-collapsed");
      localStorage.setItem(
        isCollapsedKey,
        sidebar.classList.contains("is-collapsed"),
      );
    });
  }

  if (mobileOpenBtn && sidebar) {
    mobileOpenBtn.addEventListener("click", () => {
      sidebar.classList.add("is-open");
      mobileOpenBtn.setAttribute("aria-expanded", "true");
      const overlay = document.createElement("div");
      overlay.className = "sidebar-overlay";
      document.body.appendChild(overlay);
      overlay.addEventListener("click", closeMobileMenu);
    });
  }

  function closeMobileMenu() {
    sidebar.classList.remove("is-open");
    mobileOpenBtn.setAttribute("aria-expanded", "false");
    const overlay = document.querySelector(".sidebar-overlay");
    if (overlay) overlay.remove();
  }
}
// Active link highlight
const menuLinks = document.querySelectorAll(".sidebar__menu .sidebar-link");
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    menuLinks.forEach((l) => l.classList.remove("is-active"));
    link.classList.add("is-active");
  });
});
