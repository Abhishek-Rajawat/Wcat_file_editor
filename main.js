#!/usr/bin/env node
let fs=require("fs")

let inputArr=process.argv.slice(2)


let optionArr=[]
let filesArr=[]

for(let i=0;i<inputArr.length;i++)
{
    let firstChar=inputArr[i].charAt(0)
    if(firstChar=='-')
    optionArr.push(inputArr[i])
    else
    filesArr.push(inputArr[i])

}
let contin=true

for(let i=0;i<filesArr.length;i++)
{
    let isFilePresent=fs.existsSync(filesArr[i])
    if(isFilePresent==false){

        console.log(filesArr[i], " file not present")
        contin=false
        break

    }
}
if(optionArr.includes('-b') && optionArr.includes('-n')){
    console.log("Cannot perform -b -n simultaenously")
    contin=false
}
if(contin==true){
let content=""
for(let i=0;i<filesArr.length;i++)
{
    let buffer=fs.readFileSync(filesArr[i])
    content=content+buffer+"\n"

}
let contentArr=content.split("\n")


let isSIncluded=optionArr.includes('-s')
if(isSIncluded==true){
for(let i=1;i<contentArr.length;i++)
{
    if(contentArr[i]=="" && contentArr[i-1]=="")
    contentArr[i]=null
    else if(contentArr[i]=="" && contentArr[i-1]==null)
    contentArr[i]=null

}
let tempArr=[]
for(let i=0;i<contentArr.length;i++)
{
    if(contentArr[i]!=null)
    tempArr.push(contentArr[i])

}
contentArr=tempArr
}

let isBIncluded=optionArr.includes('-b')
if(isBIncluded==true){
    let count=1;
    for(let i=0;i<contentArr.length;i++)
    {
        contentArr[i]=`${count++ } ${contentArr[i]}`
    }
}

let isNIncluded=optionArr.includes('-n')
if(isNIncluded==true){
    let count=1;
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!="" || contentArr[i].trim()!='')
        contentArr[i]=`${count++ } ${contentArr[i]}`
    }
}

content=contentArr.join("\n")
console.log(content)
}