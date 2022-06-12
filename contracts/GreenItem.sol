//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GreenItem is ERC1155Burnable {
    uint256 public constant GREEN = 0;
    uint256 public constant YELLOW = 1;
    uint256 public constant BLUE = 2;
    uint256 public constant GREENL2 = 3;
    uint256 public constant YELLOWL2 = 4;
    uint256 public constant BLUE2 = 5;
    uint256 public constant GREENL3 = 6;
    uint256 public constant YELLOWL3 = 7;
    uint256 public constant BLUE3 = 8;

    // ultimate token
    uint256 public constant RECYCLER = 9;

    constructor() public ERC1155("https://example.link/{id}.json") {
        _mint(msg.sender, GREEN, 10000, "");
        _mint(msg.sender, YELLOW, 10000, "");
        _mint(msg.sender, BLUE, 10000, "");
        _mint(msg.sender, GREENL2, 10000, "");
        _mint(msg.sender, YELLOWL2, 10000, "");
        _mint(msg.sender, BLUE2, 10000, "");
        _mint(msg.sender, GREENL3, 10000, "");
        _mint(msg.sender, YELLOWL3, 10000, "");
        _mint(msg.sender, BLUE3, 10000, "");
        _mint(msg.sender, RECYCLER, 10000, "");
    }

    // p_id = 1 Plastic , p_id = 2 Battery , p_id=3 Glass
    function recycle(uint256 process_id) public {
        if (process_id == 1) {
            _mint(msg.sender, GREEN, 1, "");
        } else if (process_id == 2) {
            _mint(msg.sender, YELLOW, 1, "");
        } else {
            _mint(msg.sender, BLUE, 1, "");
        }
    }

    function Green1to2() public {
        require(balanceOf(msg.sender, 0) >= 5, "Not enough green token!");
        burn(msg.sender, 0, 5);
        _mint(msg.sender, GREENL2, 1, "");
    }

    function Green2to3() public {
        require(balanceOf(msg.sender, 3) >= 5, "Not enough green2 token!");
        burn(msg.sender, 3, 5);
        _mint(msg.sender, GREENL3, 1, "");
    }

    function Yellow1to2() public {
        require(balanceOf(msg.sender, 1) >= 5, "Not enough yellow token!");
        burn(msg.sender, 1, 5);
        _mint(msg.sender, YELLOWL2, 1, "");
    }

    function Yellow2to3() public {
        require(balanceOf(msg.sender, 4) >= 5, "Not enough yellow2 token!");
        burn(msg.sender, 4, 5);
        _mint(msg.sender, YELLOWL3, 1, "");
    }

    function Blue1to2() public {
        require(balanceOf(msg.sender, 2) >= 5, "Not enough blue token!");
        burn(msg.sender, 2, 5);
        _mint(msg.sender, BLUE2, 1, "");
    }

    function Blue2to3() public {
        require(balanceOf(msg.sender, 5) >= 5, "Not enough blue2 token!");
        burn(msg.sender, 5, 5);
        _mint(msg.sender, BLUE3, 1, "");
    }

    function level_up_to_recycler() public {
        require(
            balanceOf(msg.sender, 6) >= 5 &&
                balanceOf(msg.sender, 7) >= 5 &&
                balanceOf(msg.sender, 8) >= 5,
            "not enough Token!"
        );
        burn(msg.sender, 6, 5);
        burn(msg.sender, 7, 5);
        burn(msg.sender, 8, 5);
        _mint(msg.sender, RECYCLER, 1, "");
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked("link", Strings.toString(_tokenId), ".json")
            );
    }
}
