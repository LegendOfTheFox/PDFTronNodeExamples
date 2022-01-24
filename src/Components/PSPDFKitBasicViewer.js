import React, { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
const containerRef = useRef(null);

useEffect(() => {
	const container = containerRef.current;
	let instance, PSPDFKit;

	(async function() {
		PSPDFKit = await import("pspdfkit");

		var startTime = performance.now();


		let res = await fetch('http://localhost:3000/documents/7KPS64488F0S44C4GE4DM9PH0S', { 
			//mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		console.log("What is the res");
		let data = await res.json();
		console.log(data);
		//console.log(await res.json());


		instance = await PSPDFKit.load({
		// Container where PSPDFKit should be mounted.
		container,
		documentId: data.documentId,
		authPayload: { jwt: data.jwt},
		instant: true,
		// The document to open.
		//document: props.document,
		// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
		//baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`
		});

		instance.addEventListener("annotations.load", (loadedAnnotations) => {
  		console.log("Annotations Loaded");
		});
		var endTime = performance.now();


		console.log(`Load Document took ${endTime - startTime} milliseconds`);
	})();

	return () => PSPDFKit && PSPDFKit.unload(container);
}, []);

return (
	<React.Fragment>
		
		<div ref={containerRef} style={{ width: "100%", height: "100%"}}/>
	</React.Fragment>
);
}