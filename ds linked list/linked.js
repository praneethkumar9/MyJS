function insertNodeAtTail(head, data) {
    const node = new SinglyLinkedListNode(data)
      node.next = null;
   const headNode = head;
   if(!headNode){
       return node;
   }else{
      let current = headNode; 
      while(current.next){
          current = current.next;
      }
      current.next = node;
      return head;
   }
   }    


function insertNodeAtPosition(head, data, position) {
    let current = head;
    let prev = null;
    let count = 0;
    const node = new SinglyLinkedListNode(data);
    if(position==0){
        node.next=head;
        return node
    }else{
        count = 1
        while(current.next){
            prev = current;
            current = current.next
            if(count==position){
                node.next = current;
                prev.next = node;
                return head;
            }
            count++;
        }
    }
    
    }

    function deleteNode(head, position) {

        let current = head;
        let prev = null;
        let count =0 ;
        if(position==0){
            current = head.next
            return current;
        }else{
            count = 1
        while(current.next){
            prev = current;
            current = current.next;
            if(position==count){
                prev.next = current.next;
                return head
            }
            count++
        }
        }
        
        }

        function reversePrint(head) {
            let print = [];
            let current = head;
            while(current.next){
                print.push(current.data);
                current = current.next
            }
            print.push(current.data)
            let revPrint = print.reverse();
            revPrint.forEach(item=>console.log(item))
            
            }


            function reverse(head) {
                let dataList =[];
                let current = head;
                while(current.next){
                    dataList.push(new SinglyLinkedListNode(current.data));
                    current = current.next;
                }
                dataList.push(new SinglyLinkedListNode(current.data));
                dataList = dataList.reverse()
                dataList.forEach((item,index)=>{
                    if(index!=dataList.length){    
                   item.next= dataList[index+1];
                    }
                })
                return dataList[0];
                }

                function CompareLists(llist1, llist2) {
                    let l1 = llist1;
                    let l2 = llist2;
                    let l1data = [] , l2data=[];
                    
                    while(l1.next){
                        l1data.push(l1.data);
                        l1 = l1.next;
                    }
                    l1data.push(l1.data);
                    while(l2.next){
                        l2data.push(l2.data);
                        l2 = l2.next;
                    }
                    l2data.push(l2.data);
                    if(l1data.toString()==l2data.toString()){
                        return 1
                    }else{
                        return 0
                    }
                    
                    
                    }
                    
                    /*
 * For your reference:
 *
 * SinglyLinkedListNode {
 *     int data;
 *     SinglyLinkedListNode next;
 * }
 *
 */
function mergeLists(head1, head2) {
        let l1 = head1;
                            let l2 = head2;
                            let l1data = [] , l2data=[];
                            
                            while(l1.next){
                                l1data.push(l1.data);
                                l1 = l1.next;
                            }
                            l1data.push(l1.data);
                            while(l2.next){
                                l2data.push(l2.data);
                                l2 = l2.next;
                            }
                            l2data.push(l2.data);
    let mergeData = l1data.concat(l2data);
    mergeData.sort((a,b)=>a-b);
    let current = null;
    let mainLinkedList;
    mergeData.forEach((item,index)=>{
          let node = new SinglyLinkedListNode(item);
          if(!current){
              current = node
              mainLinkedList = node;
          }else{
              current.next = node;
              current = node;
          }
    });
    return mainLinkedList
    }

    function getNode(head, positionFromTail) {
    let l1 = head;
                       
                        let l1data = [] ;
                        
                        while(l1.next){
                            l1data.push(l1.data);
                            l1 = l1.next;
                        }
                        l1data.push(l1.data);
                       l1data.reverse();
                       return l1data[positionFromTail];

}

function removeDuplicates(head) {
    let l1 = head;
                            
                             let l1data = [] ;
                             
                             while(l1.next){
                                 l1data.push(l1.data);
                                 l1 = l1.next;
                             }
                             l1data.push(l1.data);
                             let uniqueData = [...new Set(l1data)];
                              let current = null;
     let mainLinkedList;
     uniqueData.forEach((item,index)=>{
           let node = new SinglyLinkedListNode(item);
           if(!current){
               current = node
               mainLinkedList = node;
           }else{
               current.next = node;
               current = node;
           }
     });
     return mainLinkedList
 
 }

 /*
 * For your reference:
 *
 * DoublyLinkedListNode {
 *     int data;
 *     DoublyLinkedListNode next;
 *     DoublyLinkedListNode prev;
 * }
 *
 */
function sortedInsert(head, data) {
// let node = new DoublyLinkedList(data);
let current = head;
let collection = [];
while(current.next){
    collection.push(current.data);
    current = current.next;
}
 collection.push(current.data);
 collection.push(data);
  collection.sort((a,b)=>a-b);
  
  let sortedHead = new DoublyLinkedListNode(collection[0]);
  let sortedCurrent = sortedHead;
  collection.shift();
  collection.forEach(item=>{
      let node = new DoublyLinkedListNode(item);
      node.prev = sortedCurrent;
      sortedCurrent.next = node;
      sortedCurrent = node;
  })
  return sortedHead;

}

function reverse(head) {
    let current = head;
    let collection = [];
    while(current.next){
        collection.push(current.data);
        current = current.next;
    }
     collection.push(current.data);
    collection.reverse();
      
      let reverseHead = new DoublyLinkedListNode(collection[0]);
      let reverseCurrent = reverseHead;
      collection.shift();
      collection.forEach(item=>{
          let node = new DoublyLinkedListNode(item);
          node.prev = reverseCurrent;
          reverseCurrent.next = node;
          reverseCurrent = node;
      })
      return reverseHead;
    
    }