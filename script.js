let options = {
	weekday: "long",
	day: "numeric",
	month: "long"
};

let option = {
	hour : "numeric",
	minute: "numeric"
}

let dtArray = []

let currentDate = new Date(),
	day = currentDate.toLocaleDateString("en-US", options),
	time = currentDate.toLocaleTimeString("en-US", option);
let b = `${day} ${time}`;
dtArray.push(b);
let dateTime = dtArray.toString();

//popup-box
const addEntry = document.querySelector(".add-btn"),
	popupBox = document.querySelector(".popup-box"),
	textBox = document.querySelector("#name"),
	closeIcon = popupBox.querySelector(".cross");

let isUpdate = false , k;


addEntry.addEventListener("click", () => {
	popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
	popupBox.classList.remove("show");
});
//popup box

let id = "no";
selectData();
function manageData() {
	document.getElementById('msg').innerHTML = "";
	const noticeToAdd = document.querySelector("#name").value;
	if (id == 'no') {
		let arr = getUserData();
		if (arr == null) {
			let data = [noticeToAdd];
			setUserData(data);
		} else {
			arr.push(noticeToAdd);
			setUserData(arr);
		}
	} else {
		let arr = getUserData();
		arr[id] = noticeToAdd;
		setUserData(arr);
	}
	document.getElementById('name').value = '';
	selectData();
}

function selectData() {
	let arr = getUserData();
	if(!arr) return;
	if (arr != null) {
		let html = '';
		let dt = dateTime;
		for (let k in arr) {
			html = html + `<tr>
			<td id="msg">${arr[k]}</td>
			<td><span id="a">${dt}</span></td>
			<td><a href="" style="text-decoration: none;color: grey;" onclick="deleteData(${k})">Delete</a><br>
			<!-- <a href="" style="text-decoration: none;color: grey;" onclick="editData(${k},'${arr[k]}' )">Edit</a> -->
			</td>
			</tr>`;
		}
		if (!isUpdate) {
			document.getElementById('root').innerHTML = html;	
		}else{
			dtArray[k] = html;
		}
	}
}

function deleteData(rid) {
	let arr = getUserData();
	arr.splice(rid, 1);
	setUserData(arr);
	selectData();
}

function editData(rid,title) {
	isUpdate = true;
	popupBox.classList.add("show");
	textBox.value = title;
}

function getUserData() {
	let arr = JSON.parse(sessionStorage.getItem('user'));
	return arr;
}

function setUserData(arr) {
	sessionStorage.setItem('user', JSON.stringify(arr));
}
