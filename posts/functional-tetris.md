---
title: "Tetris in functional style"
short: "How hard is it to write a clone of Tetris? That depends on how you approach that challenge. After one unsuccessful attempt, I decided to write Tetris is a functional style. This is a story of how a just-for-fun project changed they way I see and write software."
tags: "functional"
published: 2020-11-25
background: "#272427"
---

# The beginning of Super Average Tetris

For a while in my software development career, I've been struggling with designing programs and deciding how to structure code. The object-oriented paradigm, which I have been exposed to at university, suggests defining distinct "things" that play some role in the system, and writing a class for each "thing". Methods on the classes would then reflect real-world interactions between "things". I used this strategy when working on a small, just-for-fun project: a clone of the famous Tetris game named Super Average Tetris. I must confess, my first attempt was a total disaster.

To explain why that was the case, let's design a Tetris game in OOP way. First question: What are the "things" in Tetris? There is a board with non-moving cells and the block that moves. And that's pretty much all to it. Easy peasy.

Question no. 2: How do objects interact with each other and what are their responsibilities? Well, it's not trivial to figure that out. Who initiates actions in the game? The block or the board? Or maybe there should be some player/god class that would send commands to either of them? We have not thought of that one before. Does the "move down on timeout" come from the same place as the user's "move left" command? Btw. is it the board that owns the block or the block that owns the board? Or maybe they must be coupled together? Who's responsible for creating a new block when the old lands on board cells? Who checks for game end condition?

Even a non-complex system, such as Tetris, forces a developer to explore dozens of solutions. The number of "paths" one can take grows quickly as the number of "things" increases. Each decision point can rule out other decisions, sometimes contradicting those made earlier.

I've been repeatedly redefining responsibilities of "things" and interactions between objects in my Tetris project. Every structure I came up with felt wrong in one way or another. I left the project for a few months, before I came back to it, this time wanting to try a functional approach.

With a functional mindset, we can express any game as a sequence of states (plain data), each one being a combination of the previous state and user input. We give up on the idea of actors interacting with each other in favor of an anonymous executor defining how states (plain data) are transformed. Let's try that! We must answer three questions to design a functional Tetris.

## Question 1: What is the state is Tetris?

The first element of Tetris state is the board: the board is just a grid of cells, each cell can be either occupied or empty. An occupied cell can have a color. The board could be easily represented with a 2-dimensions array of numbers. That's it.

What about the movable block? While it seems to be just a bunch of board cells, it can move independently from board cells. Just like if it was another board sliding over the proper board and covering a chunk of the board. Again, a 2-dimensional array would do the job.

While we are on the topic of sliding the block over the board, I must mention that the "slide" is also a part of the state. I call it position, and it's just a 2D vector - an offset of the block in relation to the top-left corner of the board. Notice that **the block position belongs to the state, not the block**. Why? Because the block is just a bunch of cells. It does not need to know anything about the world it's in.

What about rotation? Is it kept in the state too? Nope. A rotated block is just a different block, so theoretically rotation does not have to be remembered*.

\* Some block types in Testis don't have 4 "intuitive" rotations. For that reason, I track what rotation they are in. That does not change the fact that rotation operation produces a new block.

## Questions 2: What is the input in Tetris?

User input is one of the following commands:
- move left
- move right
- move down
- rotate left
- rotate right
- time's up!

Notice that input contains both user commands and "time's up!" coming from the game. Input represents anything that causes the game to update and has a potential impact on the next state.

## Question 3: How do we transform the state?

If the player moved left, right, or down, we to check if that move is legal, that is: the **cells of a block** with updated position **do not collide with cells on the board**\*. If that's the case (the move is legal), we copy the state replacing the position with a new one. If not, the new state will be the same as the old state.

Rotation, both to the left and right, works almost the same as move. We create a new, rotated block and check if **it does not collide with the board**. If that's the case (the move is legal), we copy the state replacing the block with a new one. Otherwise, the state will stay the same.

Now the last input variant. To handle "time's up", we check if a move down is legal, that is whether **a block** moved down by one **would not collide with the board**. When the move is legal, the new state will have the position replaced. Otherwise, we replace the board, the block, and the block position. The new board is **the old board with the block merged into it**. Additionally, **full rows are removed from the board**. The block is replaced with a new, random block and the position is reset to the top.

\* Collision happens when the block covers any cell of the board **or** any cell of the block sticks out of the board. This way we handle going too far to the sides or hitting the bottom of the board.

## Done? Yes.

Believe it or not, the design is ready. Now we have to turn input and state into data types, and implement transitions. I highlighted 3 fundamental operations in **bold**. These are:

- detecting if a block collides with a board
- merging a block with a board to produce a new board
- removing full rows from a board

They aren't that hard to implement and once you're done, the rest is trivial.

## Lessons learned

The Tetris could likely be designed in OOP way. Maybe I missed some combination of decisions that would produce a viable design. Maybe the solution was to merge the board and block into one entity because they must be closely coupled. Whatever is the case, I think that the OOP design process (at least the one I followed) is flawed. It focuses on actors and their interactions, ignoring the data because "it's an implementation detail". The goal of OOP - organizing code into isolated and manageable units - is noble, but I can stand in the way of discovering the essence of the problem you are trying to solve.

My second take on writing Tetris was successful because I approached the problem differently. I described Tetris in terms of the data and how the data changes. I found patterns in this description and turned them into functions defining the shape of an implementation.

Finishing Super Average Tetris was one of a few factors contributing to a shift in the way I see and write software. First, I try to separate data from transformations. This goes against the rules of OOP, but makes the problem understandable. Second, I structure data in a way that makes transformations easy. Simulating real-world interaction between objects can make the code more convoluted. Third, I avoid mutating data and the state of objects whenever possible. Eliminating side-effects has a nice consequence of making code transparent - it can be examined and understood without knowing about all other things that happen in a program, including non-trivial interactions between objects.

## Implementation

My Tetris implementation in Rust is available [on github](https://github.com/prk3/super-average-tetris). It adds a few details to the design created just above. Here are some of them:

## The big switch™

The game loop is a literal loop with a big switch over the input. Each branch of the switch returns a new state. The function containing the switch is pretty long. I could split action handlers into separate functions, but hey... What's the point of adding more names? ;)

## Collecting input

User input is collected in a separate thread and sent to the game loop through a channel. This clears up the update loop. However, some input related data ended up in the state. An example of that is how much time is left before the next "time's up!" input.

## Block representation

Although I treat it like a 2D array, cells of a block are represented with a 16-bit integer. This reduces the amount of memory used for block cells from 16 bytes to 2. Remember, this was a just-for-fun project.

Oh, a word about the color of a block. The color lives in the state, not inside the block. That's because I left it like that. It does not make sense at all, but I did not bother fixing it.

## Drawing the game

At the start and after each update, the game is redrawn. How do we draw the game? We simply **merge the block** in its current position **with the board** (one of the fundamental operations, remember?), iterate through all cells of the resulting new board, and print block characters with an appropriate color. Simple stuff.

## Not purely functional

I implemented the game in Rust, which is not a functional language. While the game has a functional heart, some parts of the code are not functional - they mutate variables or use procedural-looking APIs. Examples? New states override the memory of the old state. Block generator, which serves blocks in a randomized order, uses a non-functional shuffling algorithm. Why not purely functional? Because some things are easier to code in non-functional styles. I believe it's better to take the best from many worlds rather than fanatically follow one paradigm.
