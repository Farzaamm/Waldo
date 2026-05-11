import React from 'react'

const Game = () => {
  // coordinates logger to determin the coordinates of Waldo in the image, this will be used to set the coordinates of Waldo in the database
  const waldoFinder = (event) => { 
    const rect = event.currentTarget.getBoundingClientRect() // getBoundingClientRect() returns the size of an element and its position relative to the viewport.
    const xOnScreen  = event.clientX - rect.left // clientX and clientY are the coordinates of the mouse pointer relative to the top-left corner of the element
    const yOnScreen = event.clientY - rect.top // this ensures that the coordinates are relative to the image, not the entire page
    
    const x = Math.round((xOnScreen / rect.width) * 100) // Convert to percentage
    const y = Math.round((yOnScreen / rect.height) * 100) // Convert to percentage
    // console.log(`Coordinates: (${x}, ${y})`)

    /* Math.round() is used to simplify the coordinates and make it easier to set the coordinates of Waldo in the database, but it is not precise.
    It is enough for the sake of this project, but a more precise method can be implemented in the future if needed. */
    
    const topLeftX = 61 
    const topLeftY = 35 
    const bottomRightX = 62 
    const bottomRightY = 39

    if (x >= topLeftX && x <= bottomRightX && y >= topLeftY && y <= bottomRightY) {
      alert('Congratulations! You found Waldo!')
    } else {
      alert('Try again! Waldo is not at these coordinates.')
    }
  }

  return (
    <>
      <img src="Beach scene.jpg" onClick={waldoFinder} alt="" />
    </>
  )
}

export default Game