
let arr1 = ['a', 'b', 'c', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l'];
let arr2 = ['b', 'a', 'c', 'l', 'f', 'i', 'i'];

function Node(element, index) {
    this.element = element;
    this.index = index;
    this.next = null
}

function LinkedList() {
    let length = 0
    let head = null
    this.size = function() {
        return length
    }

    this.head = function() {
        return head
    }

	//each node has 3 fields: next node, value and index, we just found place to insert next element and forn array from list element values
    this.add = function(element, index) {
        let node = new Node(element, index)
        if (head === null) {
            head = node
        } else {
            let currentNode = head;
            let prevNode = null;
           
            while (currentNode.index < index && currentNode.next) {
            	prevNode = currentNode;
                currentNode = currentNode.next
            }

            if (!prevNode && currentNode.index >= index) {
            	head = node;
            	head.next = currentNode;
            } else if (prevNode && currentNode.index >= index) {
            	prevNode.next = node;
            	node.next = currentNode;
            } else {
            	currentNode.next = node;
            }
            
        }
        length++
    }

    this.createArray = function() {
		let resultArr = [];
        let currentNode = head;
        while (currentNode.next) {
        	resultArr.push(currentNode.element);
            currentNode = currentNode.next
        }
        resultArr.push(currentNode.element);
         return resultArr;  
    }
}

var list = new LinkedList();

//we should go through shorter array because in case of too huge former array we'll have big time loss
for (let elem of arr2) {
	let index = 0;
	while (elem !== arr1[index]) {
		index++;
	}
	//to solve the issue we use list 

	list.add(elem, index);
}

console.log(list.createArray());
