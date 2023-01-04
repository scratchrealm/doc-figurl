import { BrowserRouter } from "react-router-dom";
import MainWindow from "./MainWindow/MainWindow";

export function updateLocationHash() {
  const hash = window.location.hash
	let found = false
	const anchorElements = document.querySelectorAll("a")
	anchorElements.forEach(e => {
		if (found) return
		const name = e.getAttribute('name')
		if (name === hash.slice(1)) {
			e.scrollIntoView(true)
			found = true
		}
	})

	const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
	headingElements.forEach(e => {
		if (found) return
		const txt = e.textContent?.toLowerCase().split(' ').join('-')
		if (txt === hash.slice(1)) {
			e.scrollIntoView(true)
			found = true
		}
	})
}

window.addEventListener("hashchange", e => {
  updateLocationHash()
})

function App() {
  return (
    <BrowserRouter>
      <MainWindow />
    </BrowserRouter>
  );
}

export default App;
