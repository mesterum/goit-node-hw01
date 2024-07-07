# GoIT Node HW01

```bash
ubuntu@instance-20221013-1516:~$ cd ~/dev/goit/goit-node-hw01
ubuntu@instance-20221013-1516:~/dev/goit/goit-node-hw01$ node dist/index.js -a list
┌─────────┬─────────────────────────┬─────────────────┬─────────────────────────────────────────────────┬──────────────────┐
│ (index) │           id            │      name       │                      email                      │      phone       │
├─────────┼─────────────────────────┼─────────────────┼─────────────────────────────────────────────────┼──────────────────┤
│    0    │ 'AeHIrLTr6JkxGE6SN-0Rw' │ 'Allen Raymond' │           'nulla.ante@vestibul.co.uk'           │ '(992) 914-3792' │
│    1    │ 'qdggE76Jtbfd9eWJHrssH' │  'Chaim Lewis'  │              'dui.in@egetlacus.ca'              │ '(294) 840-6685' │
│    2    │ 'drsAJ4SHPYqZeG-83QTVW' │ 'Kennedy Lane'  │         'mattis.Cras@nonenimMauris.net'         │ '(542) 451-7038' │
│    3    │ 'vza2RIzNGIwutCVCs4mCL' │  'Wylie Pope'   │               'est@utquamvel.net'               │ '(692) 802-2949' │
│    4    │ '05olLMgyVQdWRwgKfg5J6' │ 'Cyrus Jackson' │            'nibh@semsempererat.com'             │ '(501) 472-5218' │
│    5    │ '1DEXoP8AuCGYc1YgoQ6hw' │ 'Abbot Franks'  │            'scelerisque@magnis.org'             │ '(186) 568-3720' │
│    6    │ 'Z5sbDlS7pCzNsnAHLtDJd' │ 'Reuben Henry'  │           'pharetra.ut@dictum.co.uk'            │ '(715) 598-5792' │
│    7    │ 'C9sjBfCo4UJCWjzBnOtxl' │ 'Simon Morton'  │           'dui.Fusce.diam@Donec.com'            │ '(233) 738-2360' │
│    8    │ 'e6ywwRe4jcqxXfCZOj_1e' │ 'Thomas Lucas'  │                 'nec@Nulla.com'                 │ '(704) 398-7993' │
│    9    │ 'rsKkOQUi80UsgVPCcLZZW' │  'Alec Howard'  │ 'Donec.elementum@scelerisquescelerisquedui.net' │ '(748) 206-2688' │
└─────────┴─────────────────────────┴─────────────────┴─────────────────────────────────────────────────┴──────────────────┘
ubuntu@instance-20221013-1516:~/dev/goit/goit-node-hw01$ node dist/index.js -a remove -i 'zzu4bcK5hqnUd9tavsUQc'
Contact with id zzu4bcK5hqnUd9tavsUQc not found
ubuntu@instance-20221013-1516:~/dev/goit/goit-node-hw01$ node dist/index.js -a add --name Mango --email mango@gmail.com --phone 322-22-22
Contact added: pRrcEV6iGSQ4LbYbYHaWO
ubuntu@instance-20221013-1516:~/dev/goit/goit-node-hw01$ node dist/index.js -a listnode dist/index.js -a list
┌─────────┬─────────────────────────┬─────────────────┬─────────────────────────────────────────────────┬──────────────────┐
│ (index) │           id            │      name       │                      email                      │      phone       │
├─────────┼─────────────────────────┼─────────────────┼─────────────────────────────────────────────────┼──────────────────┤
│    0    │ 'AeHIrLTr6JkxGE6SN-0Rw' │ 'Allen Raymond' │           'nulla.ante@vestibul.co.uk'           │ '(992) 914-3792' │
│    1    │ 'qdggE76Jtbfd9eWJHrssH' │  'Chaim Lewis'  │              'dui.in@egetlacus.ca'              │ '(294) 840-6685' │
│    2    │ 'drsAJ4SHPYqZeG-83QTVW' │ 'Kennedy Lane'  │         'mattis.Cras@nonenimMauris.net'         │ '(542) 451-7038' │
│    3    │ 'vza2RIzNGIwutCVCs4mCL' │  'Wylie Pope'   │               'est@utquamvel.net'               │ '(692) 802-2949' │
│    4    │ '05olLMgyVQdWRwgKfg5J6' │ 'Cyrus Jackson' │            'nibh@semsempererat.com'             │ '(501) 472-5218' │
│    5    │ '1DEXoP8AuCGYc1YgoQ6hw' │ 'Abbot Franks'  │            'scelerisque@magnis.org'             │ '(186) 568-3720' │
│    6    │ 'Z5sbDlS7pCzNsnAHLtDJd' │ 'Reuben Henry'  │           'pharetra.ut@dictum.co.uk'            │ '(715) 598-5792' │
│    7    │ 'C9sjBfCo4UJCWjzBnOtxl' │ 'Simon Morton'  │           'dui.Fusce.diam@Donec.com'            │ '(233) 738-2360' │
│    8    │ 'e6ywwRe4jcqxXfCZOj_1e' │ 'Thomas Lucas'  │                 'nec@Nulla.com'                 │ '(704) 398-7993' │
│    9    │ 'rsKkOQUi80UsgVPCcLZZW' │  'Alec Howard'  │ 'Donec.elementum@scelerisquescelerisquedui.net' │ '(748) 206-2688' │
│   11    │ 'pRrcEV6iGSQ4LbYbYHaWO' │     'Mango'     │                'mango@gmail.com'                │   '322-22-22'    │
└─────────┴─────────────────────────┴─────────────────┴─────────────────────────────────────────────────┴──────────────────┘
ubuntu@instance-20221013-1516:~/dev/goit/goit-node-hw01$ node dist/index.js -a get -i pRrcEV6iGSQ4LbYbYHaWO
{
  id: 'pRrcEV6iGSQ4LbYbYHaWO',
  name: 'Mango',
  email: 'mango@gmail.com',
  phone: '322-22-22'
}
ubuntu@instance-20221013-1516:~/dev/goit/goit-node-hw01$ node dist/index.js -a remove -i pRrcEV6iGSQ4LbYbYHaWO
Contact removed
ubuntu@instance-20221013-1516:~/dev/goit/goit-node-hw01$ node dist/index.js -a get -i pRrcEV6iGSQ4LbYbYHaWO
undefined
ubuntu@instance-20221013-1516:~/dev/goit/goit-node-hw01$

```

<a href="https://ibb.co/F76RjKt"><img src="https://i.ibb.co/XJXcvbT/Screenshot-2024-07-08-002207.png" alt="Screenshot-2024-07-08-002207" border="0"></a>
<a href="https://ibb.co/BnxSwRR"><img src="https://i.ibb.co/J34MCPP/Screenshot-2024-07-08-002254.png" alt="Screenshot-2024-07-08-002254" border="0"></a>