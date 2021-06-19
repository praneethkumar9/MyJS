const diff = (a1,a2) =>{
    const f = [
        ...a1.filter(el1=>!a2.includes(el1)),
        ...a2.filter(el2=>!a1.includes(el2))
    ]
    console.log(f)
}
diff([1,2],[2,3])
