<?php
 // Connecting to the database
 include "../config/config.php";

 // Gathering data from the browser CGI
 $data = json_decode(file_get_contents("php://input"));

 // Global variables
 $request = $data->request;
 $files = $data->files;

// Fetch All records
if($request == 1){
  $sql = "select * from ".$files." order by id desc";
  $userData = mysqli_query($con,$sql);

  $response = array();
  while($row = mysqli_fetch_assoc($userData)){
    $response[] = $row;
  }
  echo json_encode($response, JSON_PRETTY_PRINT);
  exit;
}

// Add record
if($request == 2){
  $title = $data->title;
  $description = $data->description;

  $sql = "SELECT * FROM ".$files." WHERE trim(title)='".$title."'";
  $userData = mysqli_query($con,$sql);
  if(mysqli_num_rows($userData)==0 ){
    mysqli_query($con,"INSERT INTO ".$files." (title,description) VALUES('".$title."','".$description."')");
    echo "Insert successfully: ".$con->insert_id;
  }else{
    echo "Record already exists";
  }

  exit;
}

// Update record
if($request == 3){
  $id = $data->id;
  $title = $data->title;
  $description = $data->description;

  mysqli_query($con,"UPDATE ".$files." SET title='".$title."', description='".$description."' WHERE id=".$id);
 
  echo "Update successfully";
  exit;
}
// Fetch JUST ONE  records
if($request == 31){
  $id = $data->id;
  $sql = "select * from ".$files." WHERE id = ".$id;
  $userData = mysqli_query($con,$sql);

  $response = array();
  while($row = mysqli_fetch_assoc($userData)){
    $response[] = $row;
  }
  echo json_encode($response, JSON_PRETTY_PRINT);
  exit;
}

// Delete record
if($request == 4){
  $id = $data->id;

  mysqli_query($con,"DELETE FROM $files WHERE id=".$id);

  echo "Delete successfully";
  exit;
}
