function generate_key_sim(){
    let private_key_1 = document.getElementById("private_key_1_sim").value;
    let private_key_2 = document.getElementById("private_key_2_sim").value;
    let public_modulus = document.getElementById("public_modulus_sim").value;
    let public_base = document.getElementById("public_base_sim").value;
    let public_key_1 = 0;
    let public_key_2 = 0;
    let shared_private_key_1 = 0;
    let shared_private_key_2 = 0;
    let results = "";

    if(private_key_1 > 0 && private_key_2 > 0 && public_modulus > 0 && public_base > 0 ){
        public_key_1 = Math.pow(public_base, private_key_1) % public_modulus;
        public_key_2 = Math.pow(public_base, private_key_2) % public_modulus;

        shared_private_key_1 = Math.pow(public_key_1, private_key_2) % public_modulus;
        shared_private_key_2 = Math.pow(public_key_2, private_key_1) % public_modulus;

        results = "<p>Public Key 1: ("+public_base+"^"+private_key_1+")%"+public_modulus+" = "+public_key_1+
            "<br/>Public Key 2: ("+public_base+"^"+private_key_2+")%"+public_modulus+" = "+public_key_2+
            "<br/>Shared Private Key: ("+public_key_2+"^"+private_key_1+")%"+public_modulus+" = "+"("+public_key_1+"^"+private_key_2+")%"+public_modulus+" = "+shared_private_key_1+"</p>"
    }
    else{
        results = "<p>Invalid input</p>"
    }

    document.getElementById("results_sim").innerHTML = results;
}

function generate_key(){
    let private_key_1 = document.getElementById("private_key_1").value;
    let public_key_2 = document.getElementById("public_key_2").value;
    let public_modulus = document.getElementById("public_modulus").value;
    let public_base = document.getElementById("public_base").value;
    let public_key_1 = 0;
    let shared_private_key_2 = 0;
    let results = "";

    if(private_key_1 > 0 && public_key_2 > 0 && public_modulus > 0 && public_base > 0 ){
        public_key_1 = Math.pow(public_base, private_key_1) % public_modulus;
        shared_private_key_2 = Math.pow(public_key_2, private_key_1) % public_modulus;

        results = "<p>Public Key 1: ("+public_base+"^"+private_key_1+")%"+public_modulus+" = "+public_key_1+
            "<br/>Shared Private Key: ("+public_key_2+"^"+private_key_1+")%"+public_modulus+" = "+shared_private_key_2+"</p>"
    }
    else{
        results = "<p>Invalid input</p>"
    }

    document.getElementById("results").innerHTML = results;
}