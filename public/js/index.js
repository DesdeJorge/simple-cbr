$(document).ready(function(){
    $("#table").DataTable();


    $("#upload").on('submit', function(e){
        var filename = $("#comic").val();

        var extension = filename.replace(/^.*\./, '');

        // Iff there is no dot anywhere in filename, we would have extension == filename,
        // so we account for this possibility now
        if (extension == filename) {
            extension = '';
        } else {
            // if there is an extension, we convert to lower case
            // (N.B. this conversion will not effect the value of the extension
            // on the file upload.)
            extension = extension.toLowerCase();
        }

        if(extension != 'cbr'){
            alert("Please select only cbr files, if you need more extensions, please create the respective issue on Github");
            return false;
        }

        $(this).submit();
    });
});