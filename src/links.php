              <a href="indexMain.php" onclick=""> 
                <span></span>
                <span></span>
                <span></span>
                <span></span>Home</a>
                <a href="profile2.php">
                <span></span>
                <span></span>
                <span></span>
                <span></span>Profile</a>
              <a href="Find.php">
                <span></span>
                <span></span>
                <span></span>
                <span></span>Search</a>
              <a href="#" onclick="onClickLoadMyGroups()">
               <span></span>
               <span></span>
               <span></span>
               <span></span>MyGroups</a>
              <a href="#" onclick="onClickLoadArrangments()">
                <span></span>
                <span></span>
                <span></span>
                <span></span>Arrangements</a>
                <a href="chat.php" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>Chat</a>
                <?php
                 if($_SESSION['type']=="agency"){
                echo "<a href='newArrangement.php'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>Create Arrangement</a>";
                }
                ?>
                <a href="#" onclick="onClickLoadWishes()">
                <span></span>
                <span></span>
                <span></span>
                <span></span>MyWishes</a>
                <!-- todo -->
                <!-- Bug when loging out -->
              <a href="php/logout.php?logout_id=<?php echo $_SESSION['unique_id']?>" class="logout">
                <span></span>
                <span></span>
                <span></span>
                <span></span>Logout</a>