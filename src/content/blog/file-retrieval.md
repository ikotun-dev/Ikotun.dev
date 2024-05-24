---
title: "Recovering lost files"
pubDate: 2024-05-23
author: "Ikotun Collins"
tags: ['files']
slug: 'recovering-lost-files'
---


Few weeks ago, I was trying to find a file - very old file. I have a bad habit of not backing up my files,  except I know [<b>`I REALLY NEED TO BACK THIS ONE UP`</b>]

I found [`TestDisk`](https://www.cgsecurity.org/wiki/TestDisk_Download), a tool that can be used to recover lost partitions and potentially revive non-bootable disks. 
<br/>

You can check it out here: 
#### <i>[`$ ~ TestDisk`](https://www.cgsecurity.org/wiki/TestDisk_Download)</i>

> I'm not a big expert of using testDisk, I'm just showing you how I used it to recover files that I had  forgotten about. 

If you use Linux, you can install testdisk using 
```bash
 $ sudo apt install testdisk
```
I'm on a MacOS so I'm just going to use homebrew

```bash
 $ brew install testdisk
```


![disk](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716500845/Screenshot_2024-05-23_at_10.45.30_PM_v8qwhn.png)

Above is the list of disks connected to my machine.<br/>

After successful installation, to use TestDisk <br/>
You type the testdisk command into your terminal.


> Run testdisk as root  `sudo`  so you can get access to view the connected disks
> 
```bash
  $ sudo testdisk
```

![first_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716501104/Screenshot_2024-05-23_at_10.51.21_PM_yziki1.png)

I really don't need to record what I'm doing so I would go with the `NO LOG` option 

![second_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716501229/Screenshot_2024-05-23_at_10.53.29_PM_jckcft.png)

It's showing the available disks on my machine; most are just logical partitions.<br/>
We need to identify the external disk but this isn't really giving us a proper identifier. 
<br/>

> We can find out by using the `diskutil` command 

```bash
   $ diskutil list
```

![third_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716502015/Screenshot_2024-05-23_at_11.05.30_PM_uuovce.png)

So, the last disk here is labeled `external`. 492GB $ disk6
> Go to the previous image before this, we can see our `disk6` there as well


![fourth_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716502691/Screenshot_2024-05-23_at_11.17.33_PM_szcrlb.png)

This is a notification basically letting us know we don't have write access to this disk and can only read it's content.
<br/>
Continue!

![fifth_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716502705/Screenshot_2024-05-23_at_11.17.44_PM_rvvcl6.png)

It would automatically detect the partition table type, proceed with that. 

![sixt_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716502705/Screenshot_2024-05-23_at_11.17.44_PM_rvvcl6.png)

Here, we can see the various activities that we can perfom on the disk. 

![seventh_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716502947/Screenshot_2024-05-23_at_11.22.02_PM_qwwo2y.png)


Here, it shows the available partition. Click on quick search ( might take a while )

![eighth_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716539151/Screenshot_2024-05-23_at_11.25.28_PM_o6h0ek.png)


> This confirms that this is the only available partition

![ninth_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716538910/Screenshot_2024-05-24_at_9.12.35_AM_rb7mqg.png)

Select STOP and proceed with that partition.

![tenth_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716538909/Screenshot_2024-05-24_at_9.18.56_AM_fluzzp.png)


> Here you can see all my files!


![eleventh_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716538912/Screenshot_2024-05-24_at_9.19.16_AM_bc9fyp.png)


`The files in RED : are files that were deleted previously or otherwise problematic`


`THe files in white : are files that are fine and directly accessible`

When you move to your desired file, to recover it : use the `c`  key.
> It moves you to a different directory on your machine to paste the copied files 

![twelve_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716540198/Screenshot_2024-05-24_at_9.42.19_AM_voprju.png)

> You can use the arrow keys to go in and out of the directories

As Instructed, use the `C` key when the destination is correct

> You should see this

![thirteenth_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716540489/Screenshot_2024-05-24_at_9.47.48_AM_hdehag.png)

![fourteenth_step](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716540555/Screenshot_2024-05-24_at_9.49.01_AM_peugfu.png)


> ### You can check the directory you selected for your file 


![final](https://res.cloudinary.com/dbd7rcwwx/image/upload/v1716540740/Screenshot_2024-05-24_at_9.52.05_AM_sij6nu.png)





For any issues or comments    :[`TEXT ME`](mailto:danlogan2003@gmail.com)
