import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:warehouse/features/product/presentation/pages/products_delivered.dart';
import 'package:warehouse/features/product/presentation/pages/products_received.dart';

import '../bloc/product_bloc.dart';
import 'package:warehouse/injection_container.dart' as di;

class MyTransactions extends StatefulWidget {
  MyTransactions({super.key});

  @override
  State<MyTransactions> createState() => _MyTransactionsState();
}

class _MyTransactionsState extends State<MyTransactions>
    with SingleTickerProviderStateMixin {
  bool isPressed = false;
  TabController? tabController;

  @override
  void initState() {
    tabController = TabController(length: 2, vsync: this);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => di.getIt<ProductBloc>()..add(const ProductEvent.getReceiveAndGiveProducts())
        ..add(const ProductEvent.getReceiveAndGiveProducts()),
      child: Scaffold(
        appBar: AppBar(
          bottom: TabBar(
            controller: tabController,
            labelColor: Colors.white,
            unselectedLabelColor: Colors.grey,
            labelStyle: const TextStyle(fontSize: 17, fontFamily: 'Mont'),
            tabs: const [
              Tab(
                text: 'تم استلامها',
              ),
              Tab(
                text: 'تم تسليمها',
              )
            ],
          ),
        ),
        body: TabBarView(
          controller: tabController,
          children: const [ProductsReceived(), ProductsDelivered()],
        ),
      ),
    );
  }
}