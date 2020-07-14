const endpoint = 'http://localhost:3000';

function handleClick(e) {
  e.preventDefault();
  const mainEl = document.getElementById('main');
  return getData()
    .then((data) => {
      const propertyData = data.propertyData;
      mainEl.innerHTML = `
        <div className="property-info-wrapper">
          <p><b>タイトル: </b>${propertyData.propertyName}</p>
          <p><b>タイプ: </b>${propertyData.propertyType}</p>
          <p><b>キャンセルポリシー: </b>${propertyData.cancelPolicy}</p>
          <p><b>部屋数: </b>${propertyData.roomNum}</p>
          <p><b>バスルーム数: </b>${propertyData.bathroomNum}</p>
          <p><b>一泊あたり: </b>${propertyData.priceInDollars}ドル</p>
          <p><b>ホスト: </b>${propertyData.host.firstName}</p>
        </div>
      `;
    })
    .catch((e) => {
      mainEl.innerHTML = `
        <div className="property-info-wrapper">
          <p>${e.message}</p>
        </div>
      `;
    });
}

function getData() {
  /* 
    fetchDataを呼び出し、responseのステータスを元にデータ取得成功か失敗かを判断しましょう。 
    成功ならpropertyDataをPromise.resolveで返します。
    失敗ならエラーメッセージをPromise.rejectで返します。
  */
  return fetchData().then((response) => {
    const jsonData = response.json();
    if (!response.status === 200) {
      return Promise.reject(jsonData);
    } else {
      return Promise.resolve(jsonData);
    }
  });
}

function fetchData(id = 1) {
  const url = `${endpoint}/properties/${id}`;
  /* 
    fetchを使ってデータを取得します。
  */
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

{
  const button1 = document.getElementById('button1');
  button1.addEventListener('click', handleClick);
}
