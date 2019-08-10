# Change Log

## v1.1.0
#### New Feature
* JA-65, JA-66, JA-71: User account functions
  * Login/logout, sign up, update profile, change password
  * Todos, Routines, Lifestyles, Comments now will associate with user accounts for ownership

## v1.0.2
#### Improvement
* JA-60: When editing Todo Item and Routine, pressing Enter should also finish the editing
* JA-61: After editing Lifestyle, the Lifestyle list should be updated

#### Bug
* JA-51: Routine Daily countdown is not correct
* JA-57: After a comment is added, the comment count should increase
* JA-58: Remove configuration table from database models
* JA-62: When Done Todo Items are toggled to be shown, sub-sequent API calls to get Todo Lists should follow that setting. i.e. after editing/creating/deleting
* JA-64: Mobile version should not be scalable