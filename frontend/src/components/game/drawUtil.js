function _drawShip(ctx, player) {
  let img = new Image();
  let rotateDir = Math.atan(player.dir.y / player.dir.x);
  if (player.dir.x < 0) {
    rotateDir = rotateDir + Math.PI;
  }
  if (player.color === "RED") {
    if (player.invuln > 0) {
      img.src = redGod;
    } else {
      img.src = redShip;
    }
  } else if (player.color === "BLUE") {
    if (player.invuln > 0) {
      img.src = blueGod;
    } else {
      img.src = blueShip;
    }
  } else if (player.color === "GREEN") {
    if (player.invuln > 0) {
      img.src = greenGod;
    } else {
      img.src = greenShip;
    }
  } else if (player.color === "YELLOW") {
    if (player.invuln > 0) {
      img.src = yellowGod;
    } else {
      img.src = yellowShip;
    }
  }
  console.log(player.color);
  ctx.save();
  ctx.translate(player.pos.x, player.pos.y);
  ctx.rotate(rotateDir);
  ctx.translate(-player.pos.x, -player.pos.y);
  ctx.drawImage(
    img,
    player.pos.x - player.radius - 1,
    player.pos.y - player.radius - 3,
    player.radius * 2 + 5,
    player.radius * 2 + 5
  );
  ctx.restore();
}
