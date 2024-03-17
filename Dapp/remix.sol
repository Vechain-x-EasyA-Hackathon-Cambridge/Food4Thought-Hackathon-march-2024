pragma solidity ^0.8.0;


contract FoodtoEarn {

  mapping(string => uint256) public deposits;
  mapping(address =>mapping(string=>bool)) public rewardedUsers;
  address public owner;
  
  event DepositReceived(address indexed user, uint256 amount, string foodItem);
  event RewardPaid(address indexed user, uint256 amount);

  constructor(){
    owner = msg.sender;
  }

  function reportItemForTheReview(string memory foodItem) public payable{
  deposits[foodItem] += msg.value;
  emit DepositReceived(msg.sender, msg.value, foodItem);
  }

  function checkTotalDeposits (string memory foodItem) public view returns (uint256){
  return deposits[foodItem];
  }

  function rewardUser(address user, string memory foodItem, uint256 rewardAmount) public {
  require(msg.sender == owner, "Owner only can");
  require(!rewardedUsers[user][foodItem], "Already rewarded");
  require(deposits[foodItem] >= rewardAmount, "Insufficient funds");

  rewardedUsers[user][foodItem] = true;
  deposits[foodItem] -= rewardAmount;
  
  payable(user).transfer(rewardAmount);
  emit RewardPaid(user, rewardAmount);
  }
}
