

document.getElementById('formContacto')
        .addEventListener('submit', function(event){
                                        let isValid=true;
                                        const nombre = document.getElementById('fnombre').value.trim();
                                        const email = document.getElementById('femail').value.trim();
                                        const mensaje = document.getElementById('fmensaje').value.trim();
                                        const motivo = document.getElementsByName('motivos');

                                 
                                        let motivoChecked = false;
                                        for (const m of motivo){
                                            if (m.checked){
                                                motivoChecked = true;
                                                break;
                                            }
                                        }

                                        if((nombre=='') || (email=='') || (mensaje =='') || (!motivoChecked)){
                                         
                                           const mensaje = document.getElementById("errorContacto").classList.add("visible");
                                           event.preventDefault();
                                        }
                                        
        })

