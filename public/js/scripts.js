

function batchView(){
    const select = document.getElementById('viewSel').value;
    if(select === '' || select === null){
        document.getElementById("vieberror").className = 'alert alert-danger'
        document.getElementById("vieberror").textContent = "Please select a Batch";
    }else{
        document.getElementById('batch-view').submit();
    }
    
}

function addBatch(){
    const start = parseInt(document.getElementById('strY').value);
    const end = parseInt(document.getElementById('endY').value);
    let berrors =[];
    if(!start || !end){
        berrors.push({msg:'Please Fill all the fields'});
    }
    if((start == end) && start && end){
        berrors.push({msg:'Starting and Ending Year cannot be the same'});
    }
    if((typeof start != 'number' || typeof end != 'number')){
        berrors.push({msg: 'Please enter a valid Year'});
        
    }
    if((start > end)  && start && end ){
        berrors.push({msg:'Ending Year should be greater than Starting year'});
    }
    if(berrors.length > 0){
        document.getElementById("addberror").className = 'alert alert-danger';
        berrors.forEach(function(berror){
            document.getElementById("addberror").textContent = berror.msg;
        });
        
    }else{
        document.getElementById('add-batch').submit();
    }
    
}


function addBook(){
    const bId = document.getElementById('bId').value;
    const isbn = document.getElementById('isb').value;
    const title = document.getElementById('tit').value;
    const author = document.getElementById('aut').value;
    const edition = document.getElementById('edi').value;
    const status = document.getElementById('stat').value;
    
    let adberrors =[];
    
        if(!bId || !isbn  || !title || !edition || !author ){
            adberrors.push({msg:'Please Fill All the Flieds'});
            
        }
        if((status === '' || status === null) && bId && isbn && title && edition && author ){
            adberrors.push({msg:'Please select the present condition of the book'});
        }
        if(!parseInt(isbn) && isbn){
            adberrors.push({msg: 'Please enter a valid isbn number'});
        }
        if(adberrors.length > 0){
            document.getElementById("adberror").className = 'alert alert-danger';
            adberrors.forEach(function(adberror){
                document.getElementById("adberror").textContent = adberror.msg;
            });
            
        }else{
            if(window.confirm('Please confirm issue')) return document.getElementById('add-book').submit();
        }
}

function addStd(){
    const selBat = document.getElementById('selBat').value;
    const gender = document.getElementById('selGen').value;
    const name = document.getElementById('nam').value;
    const admNo = document.getElementById('adNo').value;
    let aserrors =[];
    if( !admNo || !name ){
        aserrors.push({msg:'Please Fill all the fields'});
    }
    if((selBat === '' || selBat === null) && admNo && name && gender){
        aserrors.push({msg:'Please select the Batch'});
    } 
    if((gender  === '' || gender === null) && admNo && name && selBat){
        aserrors.push({msg:'Please select the gender'});
    }
    if(!parseInt(admNo) && admNo){
        aserrors.push({msg:'Please Enter a valid Admission Number'});
    }
    if(aserrors.length > 0){
        document.getElementById("aserror").className = 'alert alert-danger';
            aserrors.forEach(function(aserror){
                document.getElementById("aserror").textContent = aserror.msg;
            });
    }else{
        if(window.confirm('Please confirm ')) return document.getElementById('add-std').submit();
    }

}

/* 
function login(){
    const email = document.getElementById('uem').value;
    const pass = document.getElementById('ups').value;
    let logerrors=[];
    if(!email || ! pass){
        logerrors.push({msg:'Please Fill all the fields'});
    }

    if(logerrors.length >0){
        document.getElementById("logerror").className = 'alert alert-danger';
        logerrors.forEach(function(logerror){
            document.getElementById("logerror").textContent = logerror.msg;
        });
    }else{
        document.getElementById('login-user').submit();
    }

} */

/* 
function register(){
    const remail = document.getElementById('ruem').value;
    const rpass = document.getElementById('rups').value;
    const rconfirmPass = document.getElementById('cpas').value;
    const rname  = document.getElementById('unam').value;
    let regerrors=[];
    if(!remail || ! rpass || !rconfirmPass || ! rname){
        regerrors.push({msg:'Please Fill all the fields'});
    }
    if(rpass.length < 6){
        regerrors.push({msg:'Password Should not be less than 6'});
    }
    if(rpass != rconfirmPass){
        regerrors.push({msg:'Password Does not match'});
    }

    if(regerrors.length >0){
        document.getElementById("regerror").className = 'alert alert-danger';
        regerrors.forEach(function(regerror){
            document.getElementById("regerror").textContent = regerror.msg;
        });
    }else{
        document.getElementById('reg-user').submit();
    }

}
 */

 function bookSearch(){
    const issue = document.getElementById('serBk').value;
    if(!issue){
        document.getElementById("isserror").className = 'alert alert-danger'
        document.getElementById("isserror").textContent = "Please enter the Book Name";
    }else{
        document.getElementById('search-bk').submit();
    }
}

function issueBook(){
    const issueto =document.getElementById('issto').value;
    const isstobk =document.getElementById('issbk').value;

    let issssserrroorrs =[];
    if(!issueto || !isstobk){
        issssserrroorrs.push({msg:'Please Fill all the fields'});
    }
    if(!issueto && isstobk){
        issssserrroorrs.push({msg:'Please enter the student admission number'});
    }
    if(!isstobk && issueto ){
        issssserrroorrs.push({msg:'Please enter the Book ID'});
    }
    if(issssserrroorrs.length >0 ){
        document.getElementById("issueerror").className = 'alert alert-danger';
        issssserrroorrs.forEach(function(issssserrroorr){
            document.getElementById("issueerror").textContent = issssserrroorr.msg;
        });
    }else{
        document.getElementById('issueBkID').submit();
    }
}

function issued(){
    const fiissbk =document.getElementById('fiissbk').value;
    const fiissad =document.getElementById('fiissad').value;
    let finalerrors =[];
    if(!fiissbk || !fiissad ){
        finalerrors.push({msg:'Your are not allowed to change the book id or student no'})
    }
    if(finalerror.length > 0){
        document.getElementById("finalerror").className = 'alert alert-danger';
        finalerrors.forEach(function(finalerror){
            document.getElementById("finalerror").textContent = finalerror.msg;
        });
    }else{
        if(window.confirm('Please Confirm the issue')){
            document.getElementById('final-issue').submit();
        }
    }
    
}

/* 
function searchRet(){
    const retu = document.getElementById('searchRet').value;
    if(!retu){
        document.getElementById("searretuerrors").className = 'alert alert-danger'
        document.getElementById("searretuerrors").textContent = "Please enter Admission Number";
    }else{
        document.getElementById('search-return-book').submit();
    }
} */

function bookReturn(){  
    if(window.confirm('Please confirm')){
    document.getElementById('final-return').submit();
    }   
}

function returncheckBook(){
    const retbk = document.getElementById('retbk').value;
    if(!retbk){
        document.getElementById('reterror').className ='alert alert-danger';
        document.getElementById('reterror').textContent ='Please Enter the Book ID';
    }else{
        
        document.getElementById('retrBkID').submit();
    }
}
    

function bookhistory(){
    const histbk = document.getElementById('hisbk').value;
    if(!histbk){
        document.getElementById('histerror').className ='alert alert-danger';
        document.getElementById('histerror').textContent = 'Please enter the book id';
    }else{
        document.getElementById('histBkID').submit();
    }
}

function editStd(){
    const selBat = document.getElementById('selBat').value;
    const gender = document.getElementById('selGen').value;
    const name = document.getElementById('nam').value;
    const admNo = document.getElementById('adNo').value;
    let aserrors =[];
    
    if( !admNo || !name){
        aserrors.push({msg:'Please Fill all the fields'});
    }
    if((selBat === 'select'  ) && admNo && name && gender){ //its not working
        aserrors.push({msg:'Please select the Batch'});
    } 
    if((gender  === 'select'  ) && admNo && name && selBat){
        aserrors.push({msg:'Please select the gender'});
    }
    if(!parseInt(admNo) && admNo){
        aserrors.push({msg:'Please Enter a valid Admission Number'});
    }
    if(aserrors.length > 0){
        document.getElementById("editserror").className = 'alert alert-danger';
            aserrors.forEach(function(aserror){
                document.getElementById("editserror").textContent = aserror.msg;
            });
    }else{
        if(window.confirm('Please confirm')) return document.getElementById('edit-std').submit();
        
    }
}



function updateProfile(){
    const uemail = document.getElementById('upemail').value;
    const uname = document.getElementById('upname').value;
    const cpass = document.getElementById('upcupass').value;
    const upass = document.getElementById('uppass').value;
    const uconpass  = document.getElementById('upconpass').value;
    let uperrors=[];
    if(!uemail || ! uname || !cpass || !upass || !uconpass){
        uperrors.push({msg:'Please Fill all the fields'});
    }
    if(upass.length < 6 && upass){
        uperrors.push({msg:'Password Should not be less than 6'});
    }
    if(upass != uconpass){
        uperrors.push({msg:'Password Does not match'});
    }

    if(uperrors.length >0){
        document.getElementById("updateerror").className = 'alert alert-danger';
        uperrors.forEach(function(uperror){
            document.getElementById("updateerror").textContent = uperror.msg;
        });
    }else{
        if(window.confirm('Update Profile')) return document.getElementById('update-profile').submit();
    }
}