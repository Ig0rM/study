class ListNode <T> {
    element: T;
    index: number;
    next: ListNode<T> | null  = null;

    constructor(element: T, index: number) {
        this.element = element;
        this.index = index;
    }
}

class List <T> {
    head: ListNode<T> | null = null;
    constructor() {};

    add(element:T, index: number): void {
        let node = new ListNode <T> (element, index)
        if (this.head === null) {
            this.head = node
        } else {
            let currentNode = this.head;
            let prevNode = null;
           
            while (currentNode.index < index && currentNode.next) {
                prevNode = currentNode;
                currentNode = currentNode.next
            }

            if (!prevNode && currentNode.index >= index) {
                this.head = node;
                this.head.next = currentNode;
            } else if (prevNode && currentNode.index >= index) {
                prevNode.next = node;
                node.next = currentNode;
            } else {
                currentNode.next = node;
            }
            
        }
    };

    toArray(): Array<T> {
        let resultArr = [];
        let currentNode = this.head;
        if (currentNode) {
            while (currentNode.next) {
                resultArr.push(currentNode.element);
                currentNode = currentNode.next
            }
            resultArr.push(currentNode.element);
        }
        
        return resultArr;  
    };
}



const arr1 = ['a', 'b', 'c', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
const arr2 = ['b', 'a', 'c', 'l', 'f', 'i', 'i', 'e'];

let list = new List<string>();

//we should go through shorter array because in case of too huge former array we'll have big time loss
for (let elem of arr2) {
 let index = 0;
 while (elem !== arr1[index]) {
     index++;
 }
 //to solve the issue we use list 

 list.add(elem, index);
}

console.log(list.toArray());

//only using arrays
function sortArr<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
    let resultArr: Array<T> = [];
    arr1.forEach(arr1el => {

        let result: Array<T> = arr2.filter(arr2el => {
            return arr1el === arr2el;
        });
        resultArr = resultArr.concat(result);
    });

     return resultArr;
}

console.log(sortArr<string>(arr1, arr2));