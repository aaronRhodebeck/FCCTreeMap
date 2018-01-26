export default function getChartData(dataAddress, onloadFunction) {
  const request = new XMLHttpRequest();
  request.open('GET', dataAddress, true);
  request.send();
  request.onload = () => {
    const data = JSON.parse(request.responseText);
    onloadFunction(data);
  };
}
