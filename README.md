## Assignment - 4 

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
getElementById is a DOM manipulation JavaScript method where it selects an element by its id from the HTML document and returns a single element. getElementsByClassName selects elements by their class name from the HTML document and returns an HTMLCollection. These two methods return HTMLCollections (except getElementById, which returns only one element).
querySelector / querySelectorAll can select elements using id, class, or tag selectors. querySelector returns the first matching element, while querySelectorAll returns a NodeList of all matching elements.

### 2. How do you create and insert a new element into the DOM?
We can create a new element in the DOM using document.createElement() and insert the new element using the appendChild() method. We can also add text or attributes to the element before inserting it.

### 3. What is Event Bubbling? And how does it work?
If we want to trigger an element using a method like click with addEventListener, the event will follow the DOM tree upwards. If the element is a child node, the event will target the parent node and continue moving upward to the uppermost ancestor, up to the root element. This process is called event bubbling.

### 4. What is Event Delegation in JavaScript? Why is it useful?
Event delegation is an event handling pattern where events are handled at a higher level in the DOM tree instead of the actual element where the event was triggered. The event triggered on a child element is handled by its parent element using event bubbling. In addEventListener, we use the event object to access event.target and determine which child element was clicked. This is useful because it reduces the number of event listeners and works well for elements with similar logic or dynamically created elements.
Example: We can handle multiple buttons by adding one event listener to their parent div and then check the event target.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
event.preventDefault() stops the browser’s default action for an event, while event.stopPropagation() stops the event from moving further through the DOM tree. stopPropagation() prevents the event of a child element from bubbling up to its parent. event.preventDefault() does not stop event bubbling, but it only prevents default actions such as a link navigating to a URL, a form submitting, or a checkbox toggling.

---


**Technology Stack:**
- HTML
- Tailwind CSS
- JavaScript
