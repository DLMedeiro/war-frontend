# Skyjo
🚧👷🏽‍♀️ Under Construction 👷🏽‍♀️🚧

## Game Details

## Program Details

## Goals

## Proposal

### Overview 

Skyjo is a multi-player card game with the goal of getting rid of as many high cards as possible.  This application is intended to closely replicate game play through a website format, allowing two users to play against one another on a single device, or across multiple devices.

### Tech Stack

Full-stack application with a heavy focus on front-end features.  

Front-end: React, Bootstrap

Back-end: Node JS, Express, PostgreSQL

Testing: Jest

### Data

The [Deck of Cards API](https://www.deckofcardsapi.com/) will generate all information regarding card data.

To replicate the card game, three decks of card will be used for each game.

Card values are based on the card face value: **Aces = -2, Kings = -1, Queens and Jacks = 0, and all remaining cards will keep their face value**.

A custom API will store Player personal data as well as any game statistics and details for that player.

### Sensitive Information

If players choose to create an account, passwords will be secured through Bcrypt.  

Logged in players will have access to game data related to their profile.

Access to game data will not be accessible across players or to non-registered users.

### User Story

As a player I should be able to:
1.	Play Skyjo with or without an Account
1.  Have access to game instructions with or without an Account
1.	Create, edit, and delete my account
1.	Play with others on my device or across multiple devices
1.	Execute game play based on instructions *See alterations to existing game play
1.  View my game statistics if I have an account

#### Alterations to existing game play

Actual game runs over multiple rounds and ends when a player reaches 100.  Initial deployment of this application will end games after a single round and a winner is declared based on the lowest score between players.

Actual game consists of a specialized deck of cards ranging from -2 to 12.  This application will achieve this through the manipulation of a standard deck of cards where __Aces = -2, Kings = -1, Queens and Jacks = 0, and all remaining cards will keep their face value.__

#### Initial User Flow

![User Flow Chart](/Documents/UserFlow.PNG "User Flow Chart")

#### Initial Front-end Component Design

![Component design structure](/Documents/ComponentDesign.PNG "Component design structure")

### Initial Schema and Model Design

![Initial Schema and Model Design](/Documents/ModelsSchema.png "Initial Schema and Model Design")

#### player: 
- Stores a player’s profile information.

#### participant: 
- Connects a player with their board through **player_id** and **board_id**, and tracks a players score using their **board_id**.  
- A **player_id** can have multiple **boards_id**s.
- A **board_id** can only have one **player_id**.
- A **board_id** may not have duplicate **player_id**s and a **player_id** may not have duplicate **board_id**s.

#### board: 
- Stores a board instance and score.
- Board scores are summed together based on the values in the **card** table and their **position_id**.
- Some **position_id**'s will prevent a card from being added to the score.  This occurs when a card is on a players board but has not been revealed yet.

#### game: 
- Stores a game instance.
- Min/Max create regulation on number of players *undecided on if this is needed*

#### participant_game:
- Connects a player to a game through **participant_id** and **game_id**.
- A game can have multiple **participant_id**s (following min/max criteria *unsure on how to create this requirement*).
- A **participant_id** can have multiple **game_id**s.
- A **game_id** may not have duplicate **participant_id**s and a **participant_id** may not have duplicate **game_id**s.  

#### move:
- Tracks data on each player’s move through **game_participants_id** and **card_id**.
- Each player will generate two line items on each turn - one draw (**add_to_hand**) and one discard (**remove_from_hand**).
- Multiple connections and duplicate records are allowed.
- **new_card_position_id** will track the new location of where the card is placed, and generate an update to the **position_id** in the **card** table. *unsure on how to create this requirement*
- **add_to_hand** and **remove_from_hand** identify if the card was removed or added to a player’s hand.
- If **remove_from_hand** is true, the **board_id** is removed from that specific card in the **card** table. *unsure on how to create this requirement*
- If **add_to_hand** is true, the **board_id** is added to that specific card in the **card** table. *unsure on how to create this requirement*
- Both **add_to_hand** and **remove_from_hand** can be false during a players turn.  This occurs when a player draws a card and then chooses to discard that card instead of adding the card to their hand.  The player's second move will then flip over a card on their board, changing the position but adding and remove will be false since the card is already tied to the board.

#### position:
- Stores card position and if the value is active through the __state__ column.
- If __state__ is true, the value is applicable to the score.
- If the __state__ is false, the value is not applicable to the score.
- *Question: Can the status of a face up card vs a face down card be manipulated on the front end?*
- The **location** of a card will change with each move.
- This table also eliminates duplication of data between move and card tables.   

#### card:
- Stores card instance.
- Card __value__ is based on the card face value Aces = -2, Kings = -1, Queens and Jacks = 0, and all remaining cards will keep their face value.
- **position_id** will track the **location** and __state__ of the card, if the __state__ is false, the value of the card is not applicable to the score, if __state__ is true, the value is added to the score in the **board** table.


### Possible Issues / Questions
- Accurate Schema and model design for functionality
- Where/How to incorporate the Deck of cards API

### Future Features
1.	Additional Game animation
1.	Increase number of players who can play at once	
1.	Accessibility
1.	Additional Game stats
1.	Games with multiple rounds



## Timeline

| Activity                       |Time Est.|Expected Start|Actual Start|Expected Complete| Actual Complete|   Notes          |
| :--------------------------:   |:-------:|:------------:|:----------:|:-------------:  |:-------------: |:----------------:|
| Schema and Model Design        | 1       |Nov 14, 2022  |Nov 14, 2022|Nov 16, 2022     |Nov 16, 2022    |                  |
| Component Structure            | 1       |Nov 14, 2022  |Nov 14, 2022|Nov 16, 2022     |Nov 16, 2022    |                  |
| Skeleton Application           | 4       |Nov 14, 2022  |Nov 14, 2022|Nov 16, 2022     |Nov 16, 2022    |                  |
| Proposal                       | 1       |Nov 16, 2022  |Nov 16, 2022|Nov 16, 2022     |Nov 16, 2022    |                  |
| Instructions                   | 1       |Nov 17, 2022  |Nov 18, 2022|Nov 17, 2022     |Nov 18, 2022    |                  |
| Page Layout                    | 1       |Nov 17, 2022  |Nov 17, 2022|Nov 21, 2022     |Nov 20, 2022    |Offline Nov 18-21 |
| Game Layout                    | 2       |Nov 21, 2022  |Nov 21, 2022|Nov 23, 2022     |                |                  |
| Updates to Proposal Data       | 1       |Nov 23, 2022  |            |Nov 23, 2022     |                |Offline Nov 24-26 |
| *Backend Setup                 | 6       |              |Nov 27, 2022|Dec 2, 2022      |                |                  |
| Profile Page                   | 1       |Nov 25, 2022  |            |Nov 25, 2022     |                |Offline Nov 14-26 |
| Game Play V1 (Single Device)   | 4       |Nov 27, 2022  |            |Dec 1, 2022      |                |                  |
| Game Play V2 (Multi Device)    | 4       |Dec 1, 2022   |            |Dec 6, 2022      |                |                  |
| Final Styling /Animation       | 3       |Dec 6, 2022   |            |Dec 16, 2022     |                |Offline Dec 7-13  |
| Clean Code                     | 2       |Dec 6, 2022   |            |Dec 16, 2022     |                |Offline Dec 7-13  |
| Documentation                  | 2       |Dec 14, 2022  |            |Dec 16, 2022     |                |                  |


## Progress and Notes
### Schema and Model Design

- Need to review __score__ execution and __move__ table.  Not sure if current solution will work as intended

### Component Structure

- Anticipating small changes during execution

### Skeleton Application

- Includes initial development of Back-end and Front-end servers
- Login, Logout, Register functionality
- Initial Database created with basic Model and Schema design

### Proposal

- Planning to update based on feedback during next mentor call

### Instructions

- Draft information included, styling not complete.  
- Gathering feedback on clarity

### Page Layout

- Routing and page connections complete
- Page information incomplete

### Game Layout

<!-- ### Game Play V1 (Single Device) -->
<!-- ### Game Play V2 (Multi Device) -->
<!-- ### Final Styling /Animation -->
<!-- ### Clean Code -->
<!-- ### Documentation -->

## Future Enhancements
1.	Additional Game animation
1.	Increase number of players who can play at once	
1.	Responsiveness
1.	Additional Game stats
1.	Games with multiple rounds