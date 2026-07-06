async function upload(){

    const file = document.getElementById("file").files[0];


    if(!file){

        alert("Kies eerst een afbeelding");

        return;

    }


    const formData = new FormData();

    formData.append(
        "image",
        file
    );


    const response = await fetch(
        "/convert",
        {
            method:"POST",
            body:formData
        }
    );


    const svg = await response.text();


    const blob = new Blob(
        [svg],
        {
            type:"image/svg+xml"
        }
    );


    const url =
    URL.createObjectURL(blob);


    const a=document.createElement("a");

    a.href=url;

    a.download="converted.svg";

    a.click();

}